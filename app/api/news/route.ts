import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEWSDATA_API_KEY;

    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=en`
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data.results || []);
  } catch (error: any) {
    console.error(error);

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