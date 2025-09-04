import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { employeeTable } from '@/server/db/schemas';

const db = drizzle(process.env.DATABASE_URL);

function verifyToken(token) {
  const secret = process.env.RESET_TOKEN_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('Missing RESET_TOKEN_SECRET');
  const [headerB64, bodyB64, signature] = token.split('.');
  if (!headerB64 || !bodyB64 || !signature) throw new Error('Invalid token');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${headerB64}.${bodyB64}`);
  const expected = hmac.digest('base64url');
  if (expected !== signature) throw new Error('Invalid signature');
  const payload = JSON.parse(
    Buffer.from(bodyB64, 'base64url').toString('utf8')
  );
  if (!payload?.exp || Date.now() / 1000 > payload.exp)
    throw new Error('Token expired');
  return payload;
}

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json(
        { message: 'Missing token or password' },
        { status: 400 }
      );
    }
    const { uid, email } = verifyToken(token);
    if (!uid || !email) throw new Error('Invalid token payload');

    // Update password for the user
    await db
      .update(employeeTable)
      .set({ password })
      .where(eq(employeeTable.id, uid));

    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('reset-password error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal error' },
      { status: 400 }
    );
  }
}
