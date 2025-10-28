"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/graphql";
import { getCsrfToken } from "@/lib/auth/csrf-client-utils";

function AuthedPage() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
    picture: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const getUser = async () => {
      if (!user?.email) {
        return;
      }
      try {
        const response = await fetch("/api/auth/user", {
          method: "POST",
          body: JSON.stringify({
            email: (user?.email ?? "") || "",
          }),
          headers: {
            "x-csrf-token": getCsrfToken() || "",
          },
        });
        if (!response.ok) {
          setError("Failed to fetch user");
          return;
        }
        const data = (await response.json()) as User;
        setUser({
          id: data.id,
          email: data.email ?? "",
          name: data.name ?? "",
          picture: data.profile_image ?? "",
        });
      } catch (error) {
        setError(error as string);
      }
    };
    getUser();
  }, [user?.email]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Authed</h1>
      <p>{user.email}</p>
      <p>{user.name}</p>
      <p>{user.picture}</p>
      <Button type="button" onClick={handleLogout} className="cursor-pointer">
        Logout
      </Button>
    </div>
  );
}

export default AuthedPage;
