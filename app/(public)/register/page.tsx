"use client";

import { Suspense } from "react";
import RegisterTemplate from "./_component/register-template";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterTemplate />
    </Suspense>
  );
}
