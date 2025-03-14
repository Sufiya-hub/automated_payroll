import { NextResponse } from 'next/server';
import { addDepartment } from '@/server/queries';
import { getDepartments } from '@/server/queries';

export async function GET(req) {
  try {
    const data = await getDepartments();
    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

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
