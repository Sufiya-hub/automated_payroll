import { NextResponse } from 'next/server';
import { getAllPayrolls } from '@/server/queries';

export async function GET() {
  try {
    const data = await getAllPayrolls();
    console.log(data);
    if (!data) {
      throw new Error('failure');
    }
    return NextResponse.json({ message: 'success', data: data.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
