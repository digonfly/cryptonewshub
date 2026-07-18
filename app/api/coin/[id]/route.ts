import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          accept: "application/json",
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch coin");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch coin",
      },
      {
        status: 500,
      }
    );
  }
}