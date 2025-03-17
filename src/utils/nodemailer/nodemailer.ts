import nodemailer from "nodemailer";
import { envVars } from "../../configuration/env.config";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use "gmail" or your SMTP service provider
  auth: {
    user: envVars.EMAIL_USER, // Your email address
    pass: envVars.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send email
export async function sendMail(
  to: string,
  subject: string,
  htmlContent: string
) {
  try {
    const mailOptions = {
      from: envVars.EMAIL_USER, // Sender email
      to,
      subject,
      html: htmlContent, // HTML email body
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
