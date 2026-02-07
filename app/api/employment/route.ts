import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { fullName, email, phone, address, position, experience, education, message } = data

    // Validate required fields
    if (!fullName || !email || !phone || !address || !position || !experience || !education) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create email content
    const emailContent = `
New Employment Application

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Address: ${address}
Position Applied For: ${position}
Years of Experience: ${experience}
Education Level: ${education}

Message:
${message || "No message provided"}

---
This application was submitted through the Omaya Class website.
    `.trim()

    // Send email using a simple fetch to an email service
    // For production, you should use a proper email service like SendGrid, Resend, etc.
    // For now, we'll log the application and return success
    console.log("Employment Application Received:")
    console.log("To: Employment@mahmoudbey-co.com")
    console.log("Subject: New Employment Application - " + position)
    console.log(emailContent)

    // In production, you would send the email here using your preferred email service
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@omayaclass.com',
    //   to: 'Employment@mahmoudbey-co.com',
    //   subject: `New Employment Application - ${position}`,
    //   text: emailContent,
    // })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("Employment application error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
