"use client";

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
