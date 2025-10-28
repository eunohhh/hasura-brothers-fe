import { env } from "@/env";
import { getCsrfToken } from "../auth/csrf-client-utils";
import { type ApiConfig, BaseAxiosClient } from "./base-axios-client";

class ApiClient extends BaseAxiosClient {
  constructor({ isServer }: { isServer: boolean }) {
    // 환경별 설정 - 클라이언트 전용이므로 apiUrl은 항상 /로 설정
    const config: ApiConfig = {
      apiUrl: isServer ? env.NEXT_PUBLIC_GRAPHQL_ENDPOINT : "/",
      timeout: 15000,
      retryAttempts: isServer ? 2 : 3,
      enableLogging: process.env.NODE_ENV === "development",
    };

    if (!config.apiUrl) {
      throw new Error("API_URL이 설정되지 않았습니다.");
    }

    super(config, getCsrfToken);
  }
}

const axios = new ApiClient({ isServer: false });
export default axios;

export const axiosServer = new ApiClient({ isServer: true });
