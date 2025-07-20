import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  return session.user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (!user.isAdmin) {
    redirect("/");
  }
  return user;
}

export async function redirectIfAuthenticated() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
}
