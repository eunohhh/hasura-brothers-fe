// app/signin/page.tsx
"use client";

import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

function SignInPage() {
  const callbackUrl = "/authed";

  const handleGoogleLogin = async () => {
    const params = new URLSearchParams({
      redirect_uri: callbackUrl, // 원래 가려던 페이지로
      register_uri: "/signup",
    });

    window.location.href = `/api/auth/google?${params.toString()}`;
  };

  const handleKakaoLogin = async () => {
    const params = new URLSearchParams({
      redirect_uri: callbackUrl, // 원래 가려던 페이지로
      register_uri: "/signup",
    });
    window.location.href = `/api/auth/kakao?${params.toString()}`;
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="cursor-pointer"
      >
        <FaGoogle />
        Google로 로그인
      </Button>
      <Button
        type="button"
        onClick={handleKakaoLogin}
        className="cursor-pointer"
      >
        <RiKakaoTalkFill />
        Kakao로 로그인
      </Button>
    </div>
  );
}

export default SignInPage;
