import { NextResponse } from 'next/server';
import { addDepartment } from '@/server/queries';

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await addDepartment(body);
    if (response?.message === 'error') {
      throw new Error('No Data Found');
    }
    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
