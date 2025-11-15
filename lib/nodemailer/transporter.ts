// lib/nodemailer/transporter.ts
import nodemailer from "nodemailer";

// Create reusable transporter using YOUR existing env variables
export const transporter = nodemailer.createTransport({
  service: "gmail", // This is easier for Gmail
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// Verify connection configuration on startup (optional)
export async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("✅ Email transporter is ready");
    return true;
  } catch (error) {
    console.error("❌ Email transporter error:", error);
    return false;
  }
}