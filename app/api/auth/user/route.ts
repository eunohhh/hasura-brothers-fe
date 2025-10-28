import { type NextRequest, NextResponse } from "next/server";
import { GetUserByEmailQuery } from "@/generated/graphql";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { OAUTH_ERROR_MESSAGES } from "@/lib/constants/consts-common";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.EMAIL_REQUIRED },
      { status: 400 },
    );
  }

  try {
    const client = getAdminClient();
    const { data: user, error } = await client.query<GetUserByEmailQuery>({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });
    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(user?.user?.[0] ?? null, { status: 200 });
  } catch (error) {
    console.error("유저 정보 조회 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_GET_USER_FROM_HASURA },
      { status: 500 },
    );
  }
}
