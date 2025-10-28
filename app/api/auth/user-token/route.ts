import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWTToken } from "@/lib/auth/token-server-utils";
import { COMMON_CONSTS } from "@/lib/constants/consts-common";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(
      COMMON_CONSTS.COOKIE_ACCESS_TOKEN,
    )?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { payload } = await verifyJWTToken(accessToken);

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
