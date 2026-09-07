export const SESSION_COOKIE = "cup_session";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export function isSessionId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{8,128}$/.test(value);
}

export function readSessionId(cookieStore) {
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return isSessionId(value) ? value : null;
}

export function writeSessionCookie(cookieStore, sessionId) {
  if (!isSessionId(sessionId)) return;
  cookieStore.set(SESSION_COOKIE, sessionId, COOKIE_OPTIONS);
}

export function clearSessionCookie(cookieStore) {
  cookieStore.set(SESSION_COOKIE, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
}
