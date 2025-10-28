// 토큰 관리 유틸리티 (클라이언트 전용)
// LocalStorage 기반 - 필요 시 사용 (현재는 쿠키 기반 인증 사용 중)
export const localStorageManager = {
  setToken: (name: string, token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, token);
    }
  },

  getToken: (name: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(name);
    }
    return null;
  },

  removeToken: (name: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },

  isAuthenticated: (name: string) => {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem(name);
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

interface GetPublicURLParams {
  isHTTPS?: boolean;
  isTrailingSlash?: boolean;
}

export function getPublicURL(params?: GetPublicURLParams) {
  const { isHTTPS = false, isTrailingSlash = false } = params ?? {};
  let url = process.env.VERCEL_URL ?? "https://localhost:3000";
  // https 로 시작하게 처리
  url = isHTTPS ? url.replace("http://", "https://") : url;
  // 주소 끝에 / 추가
  url = isTrailingSlash ? `${url}/` : url;
  return url;
}
