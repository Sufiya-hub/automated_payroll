import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { employeeTable } from '@/server/db/schemas';
import { sendEmail } from '@/server/email/sendEmail';
import {
  resetPasswordHtml,
  resetPasswordText,
} from '@/server/email/resetPasswordTemplate';

// Using a direct drizzle connection similar to src/server/queries.js
const db = drizzle(process.env.DATABASE_URL);

function createResetToken(payload) {
  const secret = process.env.RESET_TOKEN_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('Missing RESET_TOKEN_SECRET');
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresInSeconds = 60 * 60; // 1 hour
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  ).toString('base64url');
  const body = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: issuedAt,
      exp: issuedAt + expiresInSeconds,
    })
  ).toString('base64url');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${header}.${body}`);
  const signature = hmac.digest('base64url');
  console.log(`token:${header}.${body}.${signature}`);
  return `${header}.${body}.${signature}`;
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const users = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.email, email));
    const user = users?.[0];

    // Always respond 200 to avoid user enumeration
    if (!user) {
      return NextResponse.json({ message: 'ok' }, { status: 200 });
    }

    const token = createResetToken({ uid: user.id, email: user.email });
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXTAUTH_URL ||
      'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(
      token
    )}`;

    console.log('resetLink:', resetLink);

    // Send reset email (stubbed sender currently logs to console)
    try {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: resetPasswordHtml({ name: user.fullName || 'there', resetLink }),
        text: resetPasswordText({ resetLink }),
      });
    } catch (e) {
      console.warn('Email send failed (stub):', e?.message);
    }

    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('forgot-password error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
