"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CLIENT_CONSTS } from "@/constants/client.consts";
import { setTokenToLocalStorage } from "@/lib/client-utils";

export default function CallbackTemplate() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = searchParams.get("token");
    const success = searchParams.get("success");

    if (success === "true" && token) {
      try {
        // 토큰을 localStorage에 저장 (통합된 토큰 관리자 사용)
        setTokenToLocalStorage(CLIENT_CONSTS.LOCAL_STORAGE_AUTH_TOKEN, token);

        // URL에서 토큰 파라미터 제거 (보안상 히스토리에 남기지 않음)
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        url.searchParams.delete("success");

        // 히스토리 교체
        window.history.replaceState({}, "", url.toString());

        setStatus("success");

        // 잠시 후 리다이렉트
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        console.error("Token storage error:", error);
        setStatus("error");
      }
    } else {
      setStatus("error");
    }
  }, [searchParams, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-blue-600 border-b-2"></div>
          <p>로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl text-green-600">✓</div>
          <p className="text-lg">로그인 성공!</p>
          <p className="text-gray-600 text-sm">
            잠시 후 메인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-6xl text-red-600">✗</div>
        <p className="text-lg">로그인 실패</p>
        <p className="text-gray-600 text-sm">다시 시도해 주세요.</p>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          로그인 페이지로 이동
        </button>
      </div>
    </div>
  );
}
