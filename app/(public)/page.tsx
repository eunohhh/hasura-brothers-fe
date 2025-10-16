import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SERVER_CONSTS } from "@/constants/server.consts";

async function Home() {
  const cookieStore = await cookies();
  const hasToken = Boolean(
    cookieStore.get(SERVER_CONSTS.COOKIE_AUTH_TOKEN)?.value,
  );

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
      {!hasToken && (
        <Button asChild>
          <Link href="/login" className="cursor-pointer">
            Login
          </Link>
        </Button>
      )}
      <Button asChild>
        <Link href="/register" className="cursor-pointer">
          Register
        </Link>
      </Button>
    </div>
  );
}
export default Home;
