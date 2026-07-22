import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
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

    // Structured prompt - ask for separate fields to avoid JSON errors
    const prompt = `Write a comprehensive SEO-optimized blog article on: "${topic}"

Respond in this EXACT format (use these exact delimiters):

===TITLE===
[Catchy title max 60 characters]
===EXCERPT===
[Short excerpt max 150 characters]
===EMOJI===
[Single relevant emoji]
===CATEGORY===
[One of: Beginner Guide, Analysis, Education, Security, News, India Guide]
===READTIME===
[X min read]
===CONTENT===
[Full 1000-1500 word markdown article with # for main title, ## for sections, ### for subsections, ** for bold, - for bullets. Include introduction, multiple sections, practical tips, examples, and conclusion with call-to-action.]
===END===

IMPORTANT: Use exactly these delimiters. Do not add extra formatting.`;

    const modelsToTry = [
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-pro-latest",
      "gemini-2.5-pro",
    ];

    let text = "";
    let lastError = null;
    let usedModel = "";

    for (const modelName of modelsToTry) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        text = result.response.text();
        usedModel = modelName;
        console.log(`✅ Success with model: ${modelName}`);
        break;
      } catch (err: any) {
        console.log(`❌ Failed with ${modelName}:`, err.message);
        lastError = err;
        continue;
      }
    }

    if (!text) {
      throw lastError || new Error("All models failed");
    }

    // Parse the structured response
    const extractField = (fieldName: string): string => {
      const regex = new RegExp(
        `===${fieldName}===\\s*([\\s\\S]*?)\\s*(?===[A-Z]+===|$)`,
        "i"
      );
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    const title = extractField("TITLE") || `${topic} - Complete Guide`;
    const excerpt = extractField("EXCERPT") || `Learn everything about ${topic}`;
    const emoji = extractField("EMOJI") || "📝";
    const category = extractField("CATEGORY") || "Education";
    const readTime = extractField("READTIME") || "5 min read";
    const content = extractField("CONTENT") || text;

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const article = {
      slug,
      title,
      excerpt,
      content,
      category,
      emoji,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime,
      author: "CryptoNewsHub AI",
    };

    return NextResponse.json({ success: true, article, model: usedModel });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate article" },
      { status: 500 }
    );
  }
}