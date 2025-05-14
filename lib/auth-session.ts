import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import "server-only";

export async function getAuthSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
