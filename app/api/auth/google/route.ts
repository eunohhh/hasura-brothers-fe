import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CALLBACK_URL) {
    return NextResponse.json(
      { error: "Google client ID or callback URL is not set" },
      { status: 500 },
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const redirectUri = searchParams.get("redirect_uri") || "/";
    const registerUri = searchParams.get("register_uri") || "/register";

    if (!redirectUri || !registerUri) {
      return NextResponse.json(
        { error: "Redirect URI or register URI is not set" },
        { status: 400 },
      );
    }

    // state에 클라이언트 정보 담기
    const state = encodeURIComponent(
      JSON.stringify({
        protocol: request.nextUrl.protocol.replace(":", ""),
        host: request.nextUrl.host,
        redirect_uri: redirectUri,
        register_uri: registerUri,
      }),
    );

    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth",
    );
    googleAuthUrl.searchParams.append(
      "client_id",
      process.env.GOOGLE_CLIENT_ID!,
    );
    googleAuthUrl.searchParams.append(
      "redirect_uri",
      process.env.GOOGLE_CALLBACK_URL!,
    );
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("scope", "email profile");
    googleAuthUrl.searchParams.append("state", state);
    // ✅ Refresh Token 관련 설정
    googleAuthUrl.searchParams.append("access_type", "offline"); // refresh token 받기
    googleAuthUrl.searchParams.append("prompt", "consent"); // 매번 동의 화면 (항상 refresh token 받기 위해)
    // 또는 'prompt=select_account'로 계정 선택만 표시

    return NextResponse.redirect(googleAuthUrl.toString());
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to redirect to Google login" },
      { status: 500 },
    );
  }
}
