// app/api/test-email/route.ts
import { sendEmail } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Send a test welcome email
    const result = await sendEmail({
      type: "welcome",
      to: "your-email@gmail.com", // ⚠️ CHANGE THIS TO YOUR EMAIL
      data: { 
        name: "Test User" 
      },
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "✅ Email sent successfully!",
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}