import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const FROM_ADDRESS = `MPHFormLink <${process.env.GMAIL_USER}>`;

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject: "Verify your email — MPHFormLink",
    html: `
      <p>Click the link below to verify your email:</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>This link expires in 24 hours.</p>
    `,
  });
}