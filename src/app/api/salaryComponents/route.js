import { NextResponse } from 'next/server';
import { getSalaryComponents } from '@/server/queries';
import { updateSalaryComponents } from '@/server/queries';

export async function GET() {
  try {
    const data = await getSalaryComponents();
    if (!data && data?.data?.length === 0) {
      throw new Error({ message: 'failure' });
    }
    return NextResponse.json({ message: 'success', data: data.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(req) {
  try {
    const data = await req.json();
    if (!data) {
      throw new Error({ message: 'failure' });
    }
    const updatedData = await updateSalaryComponents(data);
    return NextResponse.json({ message: 'success', updatedData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
