"use client";

import { useRouter } from "next/navigation";
import { LoginStep } from "./components/LoginStep";

export default function LoginPage() {
  const router = useRouter();

  return <LoginStep onComplete={() => router.push("/home")} />;
}
