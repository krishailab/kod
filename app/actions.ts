"use server"

import { z } from "zod"

const FormSchema = z.object({
  company: z.string().min(1, "Company is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  projectDetail: z.string().min(1, "Project detail is required"),
  privacyAccepted: z.boolean().refine((val) => val === true, "You must accept the privacy policy"),
})

export async function submitContactForm(formData: FormData) {
  try {
    // ✅ Validate form input
    const validatedFields = FormSchema.safeParse({
      company: formData.get("company"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      projectDetail: formData.get("projectDetail"),
      privacyAccepted: formData.get("privacyAccepted") === "on",
    })

    if (!validatedFields.success) {
      console.error("Validation error:", validatedFields.error.flatten().fieldErrors)
      return { success: false, errors: validatedFields.error.flatten().fieldErrors }
    }

    const { company, name, phone, email, projectDetail, privacyAccepted } = validatedFields.data

    // ✅ Load Nodemailer dynamically
    const nodemailer = await import("nodemailer")

    // ✅ SMTP Configuration (Make sure to use correct port)
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com", // Ensure this is set in your .env file
      port: parseInt(process.env.SMTP_PORT || "587"), // Use 465 for SSL, 587 for TLS
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Set this in .env
        pass: process.env.EMAIL_PASS, // Set this in .env
      },
    })

    // ✅ Send Email (Fire and forget to avoid blocking UI)
    transporter.sendMail({
      from: `"KodRish Contact Form" <${process.env.EMAIL_USER}>`,
      to: "bhagatkrish65@gmail.com",
      subject: "New Contact Form Submission",
      text: `
        New contact form submission:
        Company: ${company}
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Project Detail: ${projectDetail}
        Privacy Accepted: ${privacyAccepted ? "Yes" : "No"}
      `,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #111; margin: 0; font-size: 22px;">New Contact Request</h2>
          </div>
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 15px 0;"><strong>Company:</strong> <span style="color: #475569;">${company}</span></p>
            <p style="margin: 0 0 15px 0;"><strong>Name:</strong> <span style="color: #475569;">${name}</span></p>
            <p style="margin: 0 0 15px 0;"><strong>Phone:</strong> <span style="color: #475569;">${phone}</span></p>
            <p style="margin: 0 0 15px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Project Detail:</strong></p>
            <p style="margin: 0 0 15px 0; background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; color: #475569; line-height: 1.5;">${projectDetail}</p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8;"><strong>Privacy Accepted:</strong> ${privacyAccepted ? "Yes" : "No"}</p>
          </div>
          <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 25px;">This email was sent securely from KodRish Innovation & Solutions.</p>
        </div>
      `,
    }).then(info => {
      console.log("Email sent successfully:", info.messageId)
    }).catch(error => {
      console.error("❌ Error sending email asynchronously:", error)
    })

    return { success: true, message: "Form submitted successfully! We'll contact you soon." }
  } catch (error) {
    console.error("❌ Error sending email:", error)

    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
    }
  }
}
