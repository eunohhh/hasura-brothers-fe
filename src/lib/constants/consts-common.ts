export const COMMON_CONSTS = {
  CSRF_TOKEN: "brothers-csrf-token",
  HEADER_CSRF_TOKEN: "x-csrf-token",
  HEADER_INTERNAL_REQUEST: "x-internal-request",
  DEFAULT_REGISTER_URI: "/signup",
  DEFAULT_REDIRECT_URI: "/",
  PKCE_STATE: "brothers-oauth-state",
  PKCE_VERIFIER: "brothers-pkce-verifier",
  COOKIE_ACCESS_TOKEN: "brothers-access-token",
  COOKIE_REFRESH_TOKEN: "brothers-refresh-token",
};

export const OAUTH_ERROR_MESSAGES = {
  REDIRECT_REGISTER_URI_NOT_SET:
    "Redirect URI 또는 register URI가 최종적으로 설정되지 않았습니다.",
  INVALID_REQUEST: "콜백 파라미터 누락",
  INVALID_STATE: "PKCE 쿠키 검증 실패",
  INVALID_STATE_FORMAT: "state 파싱 실패",
  FAILED_TO_REDIRECT_TO_OAUTH_LOGIN: "OAuth 로그인 주소로 리다이렉트 실패",
  FAILED_TO_GET_TOKENS: "OAuth 토큰 교환 자체가 실패",
  FAILED_TO_GET_ACCESS_TOKEN: "OAuth 액세스 토큰 발급 실패",
  FAILED_TO_GET_USER_INFO: "하수라 유저 정보 조회 실패",
  FAILED_TO_CREATE_REFRESH_TOKEN: "하수라 리프레시 토큰 인서트 및 조회 실패",
  NO_REFRESH_TOKEN_RECEIVED: "OAuth 에서 리프레시 토큰 수신 실패",
  FAILED_TO_UPDATE_USER: "하수라 유저 정보 업데이트 실패",
  FAILED_TO_CREATE_PI: "하수라 pi 생성 실패",
  FAILED_TO_CREATE_AIBEE_USER: "하수라 유저 생성 실패",
  FAILED_TO_TRY_CALLBACK: "OAuth 로그인 콜백 try 실패",
  NO_REFRESH_TOKEN_FOUND: "리프레시 토큰이 없습니다! 재로그인이 필요합니다!",
  REFRESH_TOKEN_EXPIRED:
    "리프레시 토큰이 만료되었습니다! 재로그인이 필요합니다!",
  USER_EMAIL_NOT_FOUND:
    "가입된 유저 정보에 이메일 정보가 없습니다! 토큰 재발급이 불가능합니다.",
  FAILED_TO_REFRESH_TOKEN: "리프레시 토큰 갱신 try 실패",
  FAILED_TO_LOGOUT: "로그아웃 try 실패",
  NO_ACCESS_TOKEN_FOUND: "액세스 토큰이 없습니다!",
  FAILED_TO_LOGOUT_ALL: "모든 기기 로그아웃 try 실패",
  EMAIL_REQUIRED: "요청 본문에 이메일 정보가 누락되었습니다!",
  USER_NOT_FOUND: "소셜 로그인으로 선 가입된 유저 정보를 찾을 수 없습니다!",
  USER_ALREADY_REGISTERED: "이미 회원 가입(추가정보입력)이 완료된 유저입니다!",
  FAILED_TO_SIGNUP: "추가 정보로 회원가입 요청 try 실패",
  FAILED_TO_GET_ACCESS_TOKEN_FROM_COOKIE: "쿠키에서 엑세스 토큰 조회 try 실패",
  FAILED_TO_GET_USER_FROM_HASURA: "유저 정보 조회 try 실패",
  FAILED_TO_GET_USER_FROM_JWT: "JWT에서 유저 정보 조회 try 실패",
};

export const OAUTH_CALLBACK_PATHS: Record<string, string> = {
  GOOGLE: "/api/auth/google/callback",
  KAKAO: "/api/auth/kakao/callback",
};
