import { transporter, mailOptions } from './../../config/nodemailer';

export async function sendEmail({ to, subject, html, text }) {
  if (!to) throw new Error('Recipient is required');
  const info = await transporter.sendMail({
    ...mailOptions,
    to,
    subject,
    text,
    html,
  });
  return { messageId: info?.messageId || 'sent' };
}
