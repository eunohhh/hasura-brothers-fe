// app/api/auth/logout-all/route.ts
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_CONSTS } from "@/constants/server.consts";
import { DELETE_ALL_USER_TOKENS } from "@/graphql/mutations";
import { getAdminClient } from "@/lib/apollo-admin-client";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const currentToken = cookieStore.get(
      SERVER_CONSTS.COOKIE_AUTH_TOKEN,
    )?.value;

    if (!currentToken) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const verified = await jwtVerify(
      currentToken,
      new TextEncoder().encode(process.env.HASURA_JWT_SECRET!),
    );

    const claims = verified.payload["https://hasura.io/jwt/claims"] as {
      "x-hasura-user-id": string;
    };
    const userId = claims["x-hasura-user-id"];

    // 모든 refresh token 삭제
    const client = getAdminClient();
    const { error: deleteError } = await client.mutate({
      mutation: DELETE_ALL_USER_TOKENS,
      variables: { userId },
    });

    if (deleteError) {
      console.error("Failed to delete all user tokens:", deleteError);
    }

    // 현재 쿠키 삭제
    cookieStore.delete(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
    cookieStore.delete(SERVER_CONSTS.COOKIE_TOKEN_ID);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout all error:", error);
    return NextResponse.json(
      { error: "Failed to logout from all devices" },
      { status: 500 },
    );
  }
}
