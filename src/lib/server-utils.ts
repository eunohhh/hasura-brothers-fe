import { cookies } from "next/headers";

export async function getTokenFromCookie(cookieName: string) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
}
