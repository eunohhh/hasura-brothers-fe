import { cookies } from "next/headers";

export async function getTokenFromCookie(cookieName: string) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_URL ?? // 변수명 이거 아니어도 되고 암튼 env에 있는 걸로
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // vercel 에서 자동으로 생성
    "http://localhost:3000/";
  // http 로 시작하지 않을 때(로컬호스트 아닐 때) https 로 시작하게 처리
  url = url.startsWith("http") ? url : `https://${url}`;
  // 주소 끝에 / 추가
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};
