"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCsrfToken } from "@/lib/auth/csrf-client-utils";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/signout", {
      headers: {
        "x-csrf-token": getCsrfToken() || "",
      },
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <Button type="button" onClick={handleLogout} className="cursor-pointer">
      Logout
    </Button>
  );
}
