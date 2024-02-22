
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";

export async function POST(request: NextRequest) {
    function fileToGenerativePart(path:any, mimeType:any) {
        // Log the return value
        return {
            inlineData: {
                data: path.toString(),
                mimeType
            }
        }
    }
    try {
        const {prompt, dataImages} = await request.json();
        const genAI = new GoogleGenerativeAI('AIzaSyDibewH-fbqk1uD9JTejh_g59h7FSatF6A');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const imageParts = dataImages.map((imagePath:any) =>
            fileToGenerativePart(imagePath, "image/png")
        );
        const finalPrompt = `Give me a medium length answer ${prompt}`
        const result = await model.generateContentStream([finalPrompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        return NextResponse.json({prompt, dataImages, text});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}