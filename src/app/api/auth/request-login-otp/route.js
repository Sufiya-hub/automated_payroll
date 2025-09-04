import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { employeeTable } from '@/server/db/schemas';
import { setLoginOtp } from '@/server/queries';
import { sendEmail } from '@/server/email/sendEmail';

const db = drizzle(process.env.DATABASE_URL);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json({ message: 'Email required' }, { status: 400 });

    const user = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.email, email));
    if (!user?.[0]) {
      // Prevent enumeration
      return NextResponse.json({ message: 'ok' });
    }

    const code = generateCode();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await setLoginOtp(email, code, expires);

    await sendEmail({
      to: email,
      subject: 'Your login OTP',
      text: `Your OTP is ${code}. It expires in 5 minutes`,
      html: `<p>Your OTP is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
    });

    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.error('request-login-otp error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
