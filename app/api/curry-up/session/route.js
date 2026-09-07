import { cookies } from "next/headers";
import { clearSessionCookie } from "../session";

export async function DELETE() {
  const cookieStore = await cookies();
  clearSessionCookie(cookieStore);
  return Response.json({ ok: true });
}
