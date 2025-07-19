"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const logout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user || null;

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
  };
}
