// This is a simple email service that uses the Vercel Blob API to store the PDF
// and then sends an email with a link to download the PDF
// This avoids the DNS lookup issue in serverless environments

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

interface ReceiptData {
  customerName: string
  customerEmail: string
  service: string
  packageName: string
  packageDescription: string
  amount: number
  paymentId: string
  receiptNumber: string
  currency: string
  date: string
  paymentMethod: string
}

export async function generateReceiptPDF(data: ReceiptData): Promise<Uint8Array> {
  // Create PDF receipt
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Set drawing parameters
  const { width, height } = page.getSize()
  const margin = 50
  let y = height - margin
  const lineHeight = 25

  // Add title
  page.drawText("BILLING STATEMENT", {
    x: margin,
    y,
    size: 24,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  // Add KodRish text as logo
  page.drawText("KodRish", {
    x: width - margin - 100,
    y,
    size: 24,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight * 3

  // Billed To section
  page.drawText("Billed To:", {
    x: margin,
    y,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Client Name: ${data.customerName}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Email: ${data.customerEmail}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Date: ${data.date}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Statement No.: KIS-${data.receiptNumber || data.paymentId.substring(0, 8).toUpperCase()}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  // Issued By section
  page.drawText("Issued By:", {
    x: width / 2 + 20,
    y: height - margin - lineHeight * 3,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  page.drawText("KodRish Innovation & Solution LLP", {
    x: width / 2 + 20,
    y: height - margin - lineHeight * 4,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  page.drawText("Email: bhagatkrish65@gmail.com", {
    x: width / 2 + 20,
    y: height - margin - lineHeight * 5,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  page.drawText("Website: https://kodrish.me", {
    x: width / 2 + 20,
    y: height - margin - lineHeight * 6,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight * 3

  // Service details table
  // Table header
  page.drawRectangle({
    x: margin,
    y: y - 20,
    width: width - margin * 2,
    height: 30,
    color: rgb(0.9, 0.9, 0.9),
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  })

  // Service column
  page.drawText("Service", {
    x: margin + 10,
    y: y - 5,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  // Description column
  page.drawText("Description", {
    x: margin + 150,
    y: y - 5,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  // Amount column
  page.drawText("Amount", {
    x: width - margin - 100,
    y: y - 5,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  y -= 30

  // Table row
  page.drawRectangle({
    x: margin,
    y: y - 20,
    width: width - margin * 2,
    height: 30,
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  })

  // Service value
  page.drawText(data.service, {
    x: margin + 10,
    y: y - 5,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  // Description value
  page.drawText(`${data.packageName} - ${data.packageDescription}`, {
    x: margin + 150,
    y: y - 5,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    maxWidth: 200,
  })

  // Amount value - Using $ for all currencies to avoid encoding issues
  page.drawText(`$${data.amount.toFixed(2)}`, {
    x: width - margin - 100,
    y: y - 5,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= 30

  // Total row
  page.drawRectangle({
    x: margin,
    y: y - 20,
    width: width - margin * 2,
    height: 30,
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  })

  // Total label
  page.drawText("Total", {
    x: width - margin - 200,
    y: y - 5,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  // Total value - Using $ for all currencies to avoid encoding issues
  page.drawText(`$${data.amount.toFixed(2)}`, {
    x: width - margin - 100,
    y: y - 5,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  y -= 50

  // Payment Information
  page.drawText("Payment Information:", {
    x: margin,
    y,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Payment Method: ${data.paymentMethod}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Payment ID: ${data.paymentId}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText(`Payment Date: ${data.date}`, {
    x: margin,
    y,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight * 2

  // Signature section
  page.drawText("Krish Bhagat", {
    x: margin + 50,
    y,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText("FOUNDER", {
    x: margin + 50,
    y,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  y -= lineHeight

  page.drawText("KodRish Innovation & Solutions", {
    x: margin + 50,
    y,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  // Payment received stamp
  page.drawText("PAYMENT RECEIVED", {
    x: width - margin - 150,
    y,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })

  // Save the PDF
  return await pdfDoc.save()
}
