import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { env } from "@/env";

interface SignJWTTokenPayload {
  sub: string;
  email: string;
  // picture: string;
  minutes: number;
}

// 토큰 생성 함수
export async function signJWTToken(
  payload: SignJWTTokenPayload,
): Promise<string> {
  return new SignJWT({
    sub: payload.sub,
    email: payload.email,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": payload.sub,
    },
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${payload.minutes}m`)
    .sign(new TextEncoder().encode(env.HASURA_JWT_SECRET));
}

// 토큰 검증 함수
export async function verifyJWTToken(token: string) {
  return jwtVerify(token, new TextEncoder().encode(env.HASURA_JWT_SECRET));
}
