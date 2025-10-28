import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
  GetUserByEmailQuery,
  UpdateUserByProviderMutation,
  UpdateUserByProviderMutationVariables,
} from "@/generated/graphql";
import { UPDATE_USER_BY_PROVIDER } from "@/graphql/mutations";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { rotateCsrfCookie } from "@/lib/auth/csrf-server-utils";
import { signJWTToken } from "@/lib/auth/token-server-utils";
import {
  COMMON_CONSTS,
  OAUTH_ERROR_MESSAGES,
} from "@/lib/constants/consts-common";

// POST /api/auth/signup: 추가 정보로 유저 업데이트 (verified_at: null → 현재 시간)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // 3️⃣ 입력 유효성 검증
    if (!email) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.EMAIL_REQUIRED },
        { status: 400 },
      );
    }

    // 기존 사용자 확인
    const client = getAdminClient();
    const { data: existing } = await client.query<GetUserByEmailQuery>({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });

    // 사용자가 존재하지 않으면 에러 (콜백에서 이미 생성되어야 함)
    if (!existing?.user?.length || existing.user.length === 0) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    const existingUser = existing.user[0];

    // 이미 등록 완료된 유저
    if (existingUser.name !== null) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.USER_ALREADY_REGISTERED },
        { status: 409 }, // 409 Conflict
      );
    }

    // 추가 정보로 유저 업데이트
    const { data: updatedUserData, error } = await client.mutate<
      UpdateUserByProviderMutation,
      UpdateUserByProviderMutationVariables
    >({
      mutation: UPDATE_USER_BY_PROVIDER,
      variables: {
        email: email,
        name: name,
        provider: existingUser.provider!, // 기존 provider 유지
        provider_id: existingUser.provider_id!, // 기존 provider_id 유지
      },
    });

    if (error) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.FAILED_TO_UPDATE_USER },
        { status: 500 },
      );
    }
    const updatedUser = updatedUserData?.update_user?.returning?.[0];
    if (!updatedUser) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.FAILED_TO_UPDATE_USER },
        { status: 500 },
      );
    }

    // JWT는 이미 콜백에서 발급되었지만 - phone 정보 업데이트해서 재발급
    const jwt = await signJWTToken({
      sub: updatedUser.id,
      email: updatedUser.email!, // 이미 존재하는 유저이므로 email은 항상 있음
      minutes: 10,
    });

    const cookieStore = await cookies();
    // Access Token (JWT)
    // ** JWT는 10분 만료, 쿠키는 30일 유지 → JWT 만료 시 자동 refresh 가능
    cookieStore.set(COMMON_CONSTS.COOKIE_ACCESS_TOKEN, jwt, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30일 (refresh token과 동일)
      httpOnly: true,
      secure: true, // HTTPS 필수 (개발 환경도 HTTPS 사용)
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    });

    // CSRF 토큰 로테이션
    await rotateCsrfCookie();

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("회원가입 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_SIGNUP },
      { status: 500 },
    );
  }
}
