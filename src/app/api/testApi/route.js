
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {


    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
