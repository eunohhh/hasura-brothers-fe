import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMMON_CONSTS } from "@/lib/constants/consts-common";

async function Home() {
  const cookieStore = await cookies();
  const hasToken = Boolean(
    cookieStore.get(COMMON_CONSTS.COOKIE_ACCESS_TOKEN)?.value,
  );

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
      {!hasToken && (
        <Button asChild>
          <Link href="/signin" className="cursor-pointer">
            Login
          </Link>
        </Button>
      )}
      <Button asChild>
        <Link href="/signup" className="cursor-pointer">
          Register
        </Link>
      </Button>
    </div>
  );
}
export default Home;
