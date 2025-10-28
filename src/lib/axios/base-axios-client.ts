import https from "node:https";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import { COMMON_CONSTS } from "../constants/consts-common";

// API 응답 구조 정의
export interface ApiResponse<T> {
  data: T;
  access_token?: string;
  message?: string;
  status?: string;
}

// 에러 응답 구조 정의
export interface ApiErrorResponse {
  message: string;
  detail?: string;
  code?: string;
}

// 환경별 설정 인터페이스
export interface ApiConfig {
  apiUrl: string;
  timeout?: number;
  retryAttempts?: number;
  enableLogging?: boolean;
}

// 커스텀 에러 클래스
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// axios의 기본 클래스를 확장하여 타입 안전성과 편의성을 제공합니다
// - 제네릭 사용을 편리하게 하여 axios.get<User> 형태로 1회만 타입 지정 가능
// - CSRF 토큰 자동 적용을 위한 요청 인터셉터 적용
// - 통합 에러 처리로 코드 중복 방지 및 에러 처리 로직 중앙화
// - 네트워크 오류 처리를 위한 리트라이 로직 내장
// - 서버/클라이언트 환경별 설정 지원
// 추상 클래스로 구현하여 extends로 상속하여 사용합니다.
export abstract class BaseAxiosClient {
  protected readonly axiosInstance: AxiosInstance;
  private readonly config: ApiConfig;
  private readonly getCsrfToken: (() => string | null) | undefined;

  constructor(config: ApiConfig, getCsrfToken?: () => string | null) {
    this.config = config;
    this.getCsrfToken = getCsrfToken;

    this.axiosInstance = axios.create({
      baseURL: config.apiUrl,
      timeout: config.timeout || 10000,
      httpAgent: new https.Agent({
        keepAlive: true,
        rejectUnauthorized: false,
      }),
      httpsAgent: new https.Agent({
        keepAlive: true,
        rejectUnauthorized: true,
      }),
      withCredentials: true,
    });

    this.applyRequestInterceptor(this.axiosInstance);
    this.applyResponseInterceptor(this.axiosInstance);
  }

  private applyRequestInterceptor(instance: AxiosInstance): void {
    // 요청시 CSRF 토큰 자동 적용
    instance.interceptors.request.use((config) => {
      // 클라이언트 환경에서만 CSRF 토큰 적용
      if (typeof window !== "undefined" && this.getCsrfToken) {
        const csrfToken = this.getCsrfToken();

        if (csrfToken) {
          config.headers[COMMON_CONSTS.HEADER_CSRF_TOKEN] = csrfToken;
        }
      }

      return config;
    });
  }

  private applyResponseInterceptor(instance: AxiosInstance): void {
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error: AxiosError<ApiErrorResponse>) => {
        return this.handleApiError(error);
      },
    );
  }

  // 통합 에러 처리
  private handleApiError(error: AxiosError<ApiErrorResponse>): never {
    const { status = 500, data } = error.response || {};
    const message = data?.message || error.message;

    // 로깅 (개발 환경에서만)
    if (this.config.enableLogging && process.env.NODE_ENV === "development") {
      console.error(`API Error [${status}]:`, {
        message,
        data,
        url: error.config?.url,
        method: error.config?.method,
      });
    }

    // 상태별 처리 - 추후 상황에 맞게 추가 필요
    switch (status) {
      case 400:
        throw new ApiError(status, message || "잘못된 요청입니다.", data);
      case 401:
        // 여기서 믹스의 예시처럼 로그아웃 처리를 할 수 있을 것 같습니다.
        throw new ApiError(status, message || "인증이 필요합니다.", data);
      case 403:
        throw new ApiError(status, message || "접근 권한이 없습니다.", data);
      case 404:
        throw new ApiError(
          status,
          message || "요청한 리소스를 찾을 수 없습니다.",
          data,
        );
      case 500:
        throw new ApiError(
          status,
          message || "서버 오류가 발생했습니다.",
          data,
        );
      default:
        throw new ApiError(
          status,
          message || "알 수 없는 오류가 발생했습니다.",
          data,
        );
    }
  }

  // 재시도 로직 - 네트워크 오류 중심 리트라이
  private async retryRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    let lastError: Error | undefined;

    for (let i = 0; i < 3; i++) {
      // 최대 3회 시도 (첫 시도 + 2회 리트라이)
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;

        // 서버 오류(5xx)는 리트라이하지 않음
        if (error instanceof ApiError && error.status >= 500) {
          throw error;
        }

        // 마지막 시도이거나 4xx 클라이언트 오류는 리트라이하지 않음
        if (
          i === 2 ||
          (error instanceof ApiError &&
            error.status >= 400 &&
            error.status < 500)
        ) {
          throw error;
        }

        // 지수 백오프 (1초, 2초)
        await this.delay(1000 * 2 ** i);
      }
    }

    if (lastError) {
      throw lastError;
    }

    throw new Error("Failed to retry request");
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // HTTP 메서드 (타입 안전성 및 요청 취소 지원)
  public get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig & { signal?: AbortSignal },
  ): Promise<T> {
    return this.retryRequest(
      () => this.axiosInstance.get(url, config) as Promise<T>,
    );
  }

  public delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig & { signal?: AbortSignal },
  ): Promise<T> {
    return this.retryRequest(
      () => this.axiosInstance.delete(url, config) as Promise<T>,
    );
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig & { signal?: AbortSignal },
  ): Promise<T> {
    return this.retryRequest(
      () => this.axiosInstance.post(url, data, config) as Promise<T>,
    );
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig & { signal?: AbortSignal },
  ): Promise<T> {
    return this.retryRequest(
      () => this.axiosInstance.put(url, data, config) as Promise<T>,
    );
  }

  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig & { signal?: AbortSignal },
  ): Promise<T> {
    return this.retryRequest(
      () => this.axiosInstance.patch(url, data, config) as Promise<T>,
    );
  }
}
