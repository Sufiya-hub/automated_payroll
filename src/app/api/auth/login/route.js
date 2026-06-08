import { NextResponse } from 'next/server';
import { login } from '@/server/queries';
import { loginSchema } from '@/lib/validations';

export async function POST(req) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const res = await login(email, password);
    if (!res) return NextResponse.json({ message: 'invalid' }, { status: 401 });
    // res is a user object (server/queries.login returns user or false)
    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
