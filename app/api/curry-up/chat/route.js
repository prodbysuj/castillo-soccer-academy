import { cookies } from "next/headers";
import { getChatUrl } from "../config";
import { readSessionId, writeSessionCookie } from "../session";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Send a JSON body with a message.", request_id: null },
      { status: 400 }
    );
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return Response.json(
      { error: "Message is required.", request_id: null },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const sessionId = readSessionId(cookieStore);

  try {
    const response = await fetch(getChatUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return Response.json(
        {
          error:
            data?.error || "The Curry Up Pizza assistant could not reply.",
          request_id: data?.request_id ?? null,
        },
        { status: response.status }
      );
    }

    if (data?.session_id) {
      writeSessionCookie(cookieStore, data.session_id);
    }

    return Response.json({
      response: data.response,
      request_id: data.request_id,
      latency_ms: data.latency_ms,
    });
  } catch {
    return Response.json(
      {
        error: "Cannot connect to the Curry Up Pizza assistant.",
        request_id: null,
      },
      { status: 502 }
    );
  }
}
