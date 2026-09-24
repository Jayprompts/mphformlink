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

export async function sendEndpointVerificationEmail(
  to: string,
  endpointName: string,
  verifyUrl: string
) {
  await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject: `Verify destination email for "${endpointName}" — MPHFormLink`,
    html: `
      <p>Someone set up an MPHFormLink endpoint called <strong>${endpointName}</strong> to relay form submissions to this address.</p>
      <p>Click below to verify and activate it:</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>If you didn't expect this, you can safely ignore this email.</p>
    `,
  });
}