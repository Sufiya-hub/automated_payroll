import { NextResponse } from 'next/server';
import { getAttendanceRadius, updateAttendanceRadius } from '@/server/queries';

export async function GET() {
  try {
    const res = await getAttendanceRadius();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const radius = Number(body?.radius);
    if (!Number.isFinite(radius) || radius <= 0) {
      return NextResponse.json(
        { message: 'radius must be a positive number' },
        { status: 400 }
      );
    }
    const res = await updateAttendanceRadius(radius);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
