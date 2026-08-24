import nodemailer from 'nodemailer'

interface EmailData {
  to: string
  subject: string
  html: string
}

// Nodemailer SMTP email sender
export async function sendConfirmationEmail(data: EmailData): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App Password
      },
    })

    const mailOptions = {
      from: `"KodRish Team" <${process.env.EMAIL_USER}>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ', info.response)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export function generateConfirmationEmailHtml({
  customerName,
  service,
  packageName,
  amount,
  paymentId,
  date,
  contactEmail = "kodrishsolutions@gmail.com",
  contactPhone = "+91 1234567890",
}: {
  customerName: string
  service: string
  packageName: string
  amount: number
  paymentId: string
  date: string
  contactEmail?: string
  contactPhone?: string
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #3B82F6; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Payment Confirmation</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #eee; background-color: #fff;">
        <h2>Thank you for your payment!</h2>
        <p>Dear ${customerName},</p>
        <p>We're pleased to confirm that we've received your payment for ${service} - ${packageName} Package.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #3B82F6;">Payment Details</h3>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Date:</strong> ${date}</p>
        </div>
        
        <p>If you have any questions or need further assistance, please don't hesitate to contact us:</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #3B82F6;">Contact Information</h3>
          <p><strong>Email:</strong> ${contactEmail}</p>
          <p><strong>Phone:</strong> ${contactPhone}</p>
          <p><strong>Website:</strong> <a href="https://kodrish.me" style="color: #3B82F6;">https://kodrish.me</a></p>
        </div>
        
        <p>We look forward to working with you!</p>
        <p>Best regards,<br>KodRish Team</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>© ${new Date().getFullYear()} KodRish. All rights reserved.</p>
        <p>This is an automated email, please do not reply.</p>
      </div>
    </div>
  `
}
