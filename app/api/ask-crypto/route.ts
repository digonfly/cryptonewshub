import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are a helpful cryptocurrency expert assistant. Answer the following question in a clear, concise, and informative way.

Question: "${question}"

Guidelines:
- Keep the answer between 100-250 words
- Use simple language that beginners can understand
- Include practical examples where relevant
- Focus on cryptocurrency, blockchain, and related topics
- If the question is not related to crypto, politely redirect to crypto topics
- Be factual and accurate
- Don't include markdown formatting, just plain text
- Don't start with "As an AI" or similar phrases
- Give direct, helpful answers

Answer:`;

    const modelsToTry = [
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-pro-latest",
    ];

    let answer = "";
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        answer = result.response.text().trim();
        console.log(`✅ Success with model: ${modelName}`);
        break;
      } catch (err: any) {
        console.log(`❌ Failed with ${modelName}:`, err.message);
        lastError = err;
        continue;
      }
    }

    if (!answer) {
      throw lastError || new Error("All models failed");
    }

    return NextResponse.json({ success: true, answer });
  } catch (error: any) {
    console.error("Ask Crypto Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get answer" },
      { status: 500 }
    );
  }
}