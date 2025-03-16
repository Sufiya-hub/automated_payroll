import { NextResponse } from 'next/server';
import { getEmployeeStats } from '@/server/queries';

export async function GET(request, context) {
  try {
    const data = await getEmployeeStats();
    return NextResponse.json({ data, message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
