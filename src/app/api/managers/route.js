import { NextResponse } from 'next/server';
import { addManager } from '@/server/queries';

export async function GET() {
  try {
    console.log('GOT THE GET REQ FOR /api/managers');
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('body:', body);
    const res = await addManager(body);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Error Occcured' });
  }
}
