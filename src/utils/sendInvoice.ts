import nodemailer from "nodemailer";

export async function sendInvoice(email: string, booking: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1a202c;">
      <div style="background-color: #000000; padding: 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Care.IO</h1>
        <p style="color: #a0aec0; margin: 10px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Booking Confirmation</p>
      </div>
      
      <div style="padding: 40px; background-color: #ffffff;">
        <h2 style="font-size: 22px; margin-top: 0; color: #111827;">Hello!</h2>
        <p style="color: #4a5568; line-height: 1.6;">Your booking for <strong>${booking.service}</strong> has been successfully confirmed. Our care specialist will reach out to you shortly.</p>
        
        <div style="background-color: #f7fafc; border-radius: 12px; padding: 24px; margin: 30px 0;">
          <h3 style="font-size: 16px; margin-top: 0; color: #4a5568; text-transform: uppercase;">Invoice Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096;">Service</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600;">${booking.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Duration</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600;">${booking.duration} days</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Location</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600;">${booking.division}</td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;">
              <td style="padding: 16px 0 8px; font-weight: bold; font-size: 18px;">Total Amount</td>
              <td style="padding: 16px 0 8px; text-align: right; font-weight: bold; font-size: 18px; color: #000000;">৳${booking.totalCost.toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #718096; font-size: 14px; margin-bottom: 0;">Status: <span style="color: #38a169; font-weight: bold;">${booking.status}</span></p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #a0aec0; font-size: 12px; margin: 0;">Care.IO Trust & Safety Team</p>
        <p style="color: #cbd5e0; font-size: 11px; margin: 5px 0 0;">Dedicated to safe, reliable, and professional care.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Care.IO" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Confirmed: ${booking.service} - Care.IO`,
    html: htmlContent,
  });
}
