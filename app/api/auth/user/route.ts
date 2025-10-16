import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_CONSTS } from "@/constants/server.consts";

export async function GET(_req: NextRequest) {
  if (!process.env.HASURA_JWT_SECRET) {
    return NextResponse.json({ error: "JWT secret not set" }, { status: 500 });
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SERVER_CONSTS.COOKIE_AUTH_TOKEN)?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.HASURA_JWT_SECRET),
    );

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
