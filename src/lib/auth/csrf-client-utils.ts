import { COMMON_CONSTS } from "../constants/consts-common";

function readCookieClient(name: string) {
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
  return readCookieClient(COMMON_CONSTS.CSRF_TOKEN);
}
