import { SERVER_CONSTS } from "@/constants/server.consts";

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const encoded = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));

  if (!encoded) {
    return null;
  }

  return decodeURIComponent(encoded.split("=")[1] ?? "");
}

export function getCsrfToken() {
  return readCookie(SERVER_CONSTS.COOKIE_CSRF_TOKEN);
}

export function withCsrfHeaders(init?: RequestInit) {
  const token = getCsrfToken();
  const headers = new Headers(init?.headers ?? {});

  if (token) {
    headers.set(SERVER_CONSTS.HEADER_CSRF_TOKEN, token);
  }

  return {
    ...init,
    headers,
  } satisfies RequestInit;
}
