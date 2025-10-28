import crypto from "node:crypto";
import { cookies } from "next/headers";
import { COMMON_CONSTS } from "../constants/consts-common";

export function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function createCodeVerifier(length = 64) {
  // RFC: 43~128 chars 권장
  return base64url(crypto.randomBytes(length));
}

export function createCodeChallengeS256(codeVerifier: string) {
  const hash = crypto.createHash("sha256").update(codeVerifier).digest();
  return base64url(hash);
}

export function randomState(length = 16) {
  return base64url(crypto.randomBytes(length));
}

export async function checkPKCECookies() {
  const jar = await cookies();
  const savedState = jar.get(COMMON_CONSTS.PKCE_STATE)?.value;
  const codeVerifier = jar.get(COMMON_CONSTS.PKCE_VERIFIER)?.value;

  return { savedState, codeVerifier, cookieStore: jar };
}
