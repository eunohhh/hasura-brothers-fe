// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_CONSTS } from "@/constants/server.consts";
import { DELETE_TOKEN_BY_ID } from "@/graphql/mutations";
import { getClient } from "@/lib/apollo-client";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const tokenId = cookieStore.get(SERVER_CONSTS.COOKIE_TOKEN_ID)?.value;

    // DB에서 refresh token 삭제
    if (tokenId) {
      const client = getClient();
      await client.mutate({
        mutation: DELETE_TOKEN_BY_ID,
        variables: { tokenId },
      });
    }

    // 쿠키 삭제
    cookieStore.delete(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
    cookieStore.delete(SERVER_CONSTS.COOKIE_TOKEN_ID);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
