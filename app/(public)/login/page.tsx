// app/login/page.tsx
"use client";

import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/authed";
  const callbackUrl = "/authed";

  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      redirect_uri: callbackUrl, // 원래 가려던 페이지로
      register_uri: "/register",
    });

    window.location.href = `/api/auth/google?${params.toString()}`;
  };

  const handleKakaoLogin = () => {
    const params = new URLSearchParams({
      redirect_uri: callbackUrl,
      register_uri: "/register",
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
