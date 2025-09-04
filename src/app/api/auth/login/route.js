import { NextResponse } from 'next/server';
import { login } from '@/server/queries';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const res = await login(email, password);
    if (!res) return NextResponse.json({ message: 'invalid' }, { status: 401 });
    // res is a user object (server/queries.login returns user or false)
    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
