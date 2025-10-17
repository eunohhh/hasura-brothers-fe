"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoogleUser } from "@/types/types";

function AuthedPage() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (response.ok) {
      router.push("/");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (!response.ok) {
          setError("Failed to fetch user");
          return;
        }
        const data = (await response.json()) as { user: GoogleUser };
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          picture: data.user.picture,
        });
      } catch (error) {
        setError(error as string);
      }
    };
    getUser();
  }, []);

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
