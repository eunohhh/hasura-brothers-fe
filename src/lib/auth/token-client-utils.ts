import type { LogoutResponse, RefreshTokenResponse } from "@/types/types";
import axios from "../axios/axios-client";

// 리프레시 토큰 갱신 관리자 - 아폴로 클라이언트 -> 링크에서 사용됨
export function createRefreshTokenManager() {
  let refreshPromise: Promise<boolean> | null = null;

  return {
    async refreshAccessToken(): Promise<boolean> {
      // 이미 갱신 중이면 기존 Promise 재사용
      if (refreshPromise) {
        return refreshPromise;
      }

      refreshPromise = (async () => {
        try {
          // axios 사용 (클라이언트 전용)
          const response =
            await axios.get<RefreshTokenResponse>("/api/auth/refresh");

          if (response.success) return true;

          // 갱신 실패 (requiresReauth 체크)
          console.log("💻 [Client] ⚠️ 토큰 갱신 실패");
          return false;
        } catch (error: any) {
          console.error(
            "💻 [Client] ❌ tokenManager에서 토큰 갱신 try 실패:",
            error,
          );

          // 401 에러 (refresh token 만료) - 로그아웃 처리
          if (error?.status === 401 || error?.response?.status === 401) {
            console.log("💻 [Client] ⚠️ 재인증 필요");
            try {
              await axios.delete<LogoutResponse>("/api/auth/signout");
            } catch (logoutError) {
              console.error("💻 [Client] ❌ 로그아웃 try 실패:", logoutError);
            }

            if (typeof window !== "undefined") {
              window.location.href = "/signin";
            }
          }

          return false;
        } finally {
          // Promise 초기화
          refreshPromise = null;
        }
      })();

      return refreshPromise;
    },
  };
}

// 싱글톤 으로 관리
export const refreshTokenManager = createRefreshTokenManager();
