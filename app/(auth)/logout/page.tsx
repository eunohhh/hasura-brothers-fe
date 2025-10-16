"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    <Button
      type="button"
      onClick={handleLogout}
      className="cursor-pointer bg-white text-black"
    >
      Logout
    </Button>
  );
}
