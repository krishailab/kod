import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobTitle = formData.get("jobTitle") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;

    if (!resume || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const buffer = Buffer.from(await resume.arrayBuffer());

    await transporter.sendMail({
      from: `"KodRish Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Application for ${jobTitle} - ${name}`,
      text: `
You have received a new job application!

Role: ${jobTitle}
Name: ${name}
Email: ${email}

Cover Letter:
${coverLetter || "No cover letter provided."}

Please find the applicant's resume attached.
      `,
      attachments: [
        {
          filename: resume.name || `${name.replace(/\s+/g, '_')}_Resume.pdf`,
          content: buffer,
        }
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application processing error:", error);
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}
