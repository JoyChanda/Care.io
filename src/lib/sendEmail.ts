import nodemailer from "nodemailer";

export const sendInvoiceEmail = async (to: string, booking: any, isUpdate = false) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isConfirmed = booking.status === "Confirmed";
    const subject = isConfirmed 
      ? "Booking Confirmed - Care.IO" 
      : "Booking Received - Care.IO";
    
    const title = isConfirmed 
      ? "Booking Confirmed! 🎉" 
      : "Booking Received! 📋";

    const message = isConfirmed
      ? "Great news! Your booking has been officially confirmed by our admin team."
      : "Thank you for choosing Care.IO. We have received your booking request and it is currently pending admin approval.";

    await transporter.sendMail({
      from: `"Care.IO" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #374151;">
          <h2 style="color: #0ea5e9;">${title}</h2>
          <p>Dear Valued Customer,</p>
          <p>${message}</p>
          
          <div style="background-color: #f3f4f6; padding: 25px; border-radius: 16px; margin: 25px 0;">
            <p style="margin: 5px 0; font-size: 14px; text-transform: uppercase; color: #6b7280; font-weight: bold;">Booking Details</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 10px 0;" />
            <p style="margin: 8px 0;"><strong>Booking ID:</strong> <span style="font-family: monospace; background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${booking.bookingId}</span></p>
            <p style="margin: 8px 0;"><strong>Service:</strong> ${booking.serviceName}</p>
            <p style="margin: 8px 0;"><strong>Duration:</strong> ${booking.duration}</p>
            <p style="margin: 8px 0;"><strong>Total Cost:</strong> ৳${booking.totalCost.toLocaleString()}</p>
            <p style="margin: 8px 0;"><strong>Current Status:</strong> <span style="color: ${isConfirmed ? '#10b981' : '#f59e0b'}; font-weight: bold;">${booking.status}</span></p>
            <p style="margin: 8px 0;"><strong>Date:</strong> ${booking.date}</p>
          </div>

          <p>Our care provider will reach out to you shortly for further coordination.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center;">
            This is an automated invoice and confirmation from Care.IO.<br/>
            Please do not reply directly to this email.
          </p>
        </div>
      `,
    });
    console.log(`Email sent to ${to} (${booking.status})`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
