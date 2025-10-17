// app/lib/pkce.ts (Plain Text)
import crypto from "node:crypto";

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
