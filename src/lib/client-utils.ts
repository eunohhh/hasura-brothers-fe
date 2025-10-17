import { SERVER_CONSTS } from "@/constants/server.consts";

export function getTokenFromLocalStorage(cookieName: string) {
  return localStorage.getItem(cookieName);
}

export function setTokenToLocalStorage(cookieName: string, token: string) {
  localStorage.setItem(cookieName, token);
}

export function removeTokenFromLocalStorage(cookieName: string) {
  localStorage.removeItem(cookieName);
}

// 토큰 관리 유틸리티 (통합)
export const tokenManager = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SERVER_CONSTS.COOKIE_AUTH_TOKEN, token);
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
    }
  },

  isAuthenticated: () => {
    const token = tokenManager.getToken();
    if (!token) return false;

    try {
      // JWT 토큰 만료 시간 확인
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
};
