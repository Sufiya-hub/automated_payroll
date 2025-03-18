import { NextResponse } from 'next/server';
import { getAttendanceByDate } from '@/server/queries';

export async function POST(req) {
  try {
    const { date } = await req.json();
    const data = await getAttendanceByDate(date);
    if (data?.message !== 'success') {
      throw new Error({ message: 'failure' });
    }
    return NextResponse.json({ message: 'success', data: data.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
