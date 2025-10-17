import { Suspense } from "react";
import CallbackTemplate from "./_components/callback-template";

function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackTemplate />
    </Suspense>
  );
}

export default CallbackPage;
