// app/login/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      redirect_uri: callbackUrl, // 원래 가려던 페이지로
      register_uri: "/register",
    });

    window.location.href = `/api/auth/google?${params.toString()}`;
  };

  return (
    <button type="button" onClick={handleGoogleLogin}>
      <FaGoogle />
      Google로 로그인
    </button>
  );
}
