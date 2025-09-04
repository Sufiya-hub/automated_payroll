import { NextResponse } from 'next/server';
import { verifyLoginOtp } from '@/server/queries';

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json(
        { message: 'Missing email or code' },
        { status: 400 }
      );
    }
    const user = await verifyLoginOtp(email, code);
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.error('verify-login-otp error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
