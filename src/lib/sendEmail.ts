import nodemailer from "nodemailer";

export const sendInvoiceEmail = async (to: string, booking: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Care.IO" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Booking Confirmation - Care.IO",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Booking Confirmed! 🎉</h2>
          <p>Dear Valued Customer,</p>
          <p>Thank you for choosing Care.IO. Your booking has been successfully confirmed.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Service:</strong> ${booking.serviceName}</p>
            <p style="margin: 5px 0;"><strong>Duration:</strong> ${booking.duration}</p>
            <p style="margin: 5px 0;"><strong>Total Cost:</strong> ৳${booking.totalCost.toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <p>Our care provider will reach out to you shortly.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated email. Please do not reply directly to this email.
          </p>
        </div>
      `,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
