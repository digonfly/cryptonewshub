import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.NEWSDATA_API_KEY;

    // Search query (default = crypto)
    const search =
      new URL(request.url).searchParams.get("q") || "crypto";

    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(
        search
      )}&language=en`
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data.results || []);
  } catch (error: any) {
    console.error("News API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news",
        error: error.message,
      },
      { status: 500 }
    );
  }
}