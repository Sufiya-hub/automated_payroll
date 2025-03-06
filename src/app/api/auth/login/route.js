import { NextResponse } from 'next/server';
import { login } from '@/server/queries';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const res = await login(email, password);
    // console.log('res:', res);
    if (!res?.[0]) throw new Error('Problem Occured');
    return NextResponse.json({ data: res[0], message: 'ok' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' });
  }
}
