// app/login/page.tsx
"use client";

import { FaGoogle } from "react-icons/fa";
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

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      className="cursor-pointer bg-white text-black"
    >
      <FaGoogle />
      Google로 로그인
    </Button>
  );
}
