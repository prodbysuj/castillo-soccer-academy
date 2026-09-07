import { getHealthUrl } from "../config";

export async function GET() {
  try {
    const response = await fetch(getHealthUrl(), { cache: "no-store" });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return Response.json(
        {
          status: "error",
          error: data?.error || "The assistant health check failed.",
        },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch {
    return Response.json(
      {
        status: "error",
        error: "Cannot reach the Curry Up Pizza assistant.",
      },
      { status: 502 }
    );
  }
}
