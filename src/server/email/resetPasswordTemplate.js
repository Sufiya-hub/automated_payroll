export function resetPasswordHtml({ name = 'there', resetLink }) {
  return `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif">
    <h2>Reset your password</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the button below to set a new password. This link will expire in 1 hour.</p>
    <p>
      <a href="${resetLink}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Reset Password</a>
    </p>
    <p>If you did not request this, you can safely ignore this email.</p>
  </div>
  `;
}

export function resetPasswordText({ resetLink }) {
  return `Reset your password using this link (valid for 1 hour): ${resetLink}`;
}
