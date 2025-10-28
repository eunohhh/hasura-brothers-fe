"use client";

import { Suspense } from "react";
import RegisterTemplate from "./_component/signup-template";

function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterTemplate />
    </Suspense>
  );
}

export default SignUpPage;
