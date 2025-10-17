"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterTemplate() {
  const searchParams = useSearchParams();

  // URL에서 파라미터 자동으로 채우기
  const [formData, setFormData] = useState({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    providerId: searchParams.get("providerId") || "",
    provider: searchParams.get("provider") || "GOOGLE",
    profileImage: searchParams.get("profileImage") || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // 회원가입 성공 - 홈으로 이동
      window.location.href = "/authed";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-6">
      <h1 className="mb-6 font-bold text-2xl">회원가입</h1>

      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block">
          이름
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block">
          이메일
        </label>
        <input
          type="email"
          value={formData.email}
          className="w-full rounded border bg-gray-100 p-2"
          disabled
        />
      </div>

      {formData.profileImage && (
        <div className="mb-4">
          <img
            src={formData.profileImage}
            alt="프로필"
            className="mx-auto h-20 w-20 rounded-full"
          />
        </div>
      )}

      <Button type="submit" className="w-full cursor-pointer">
        가입하기
      </Button>
    </form>
  );
}
