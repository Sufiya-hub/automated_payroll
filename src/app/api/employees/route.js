import { NextResponse } from 'next/server';
import { addEmployee, getAllEmployees } from '@/server/queries';

export async function GET() {
  try {
    // console.log('GOT THE GET REQ FOR /api/employess');
    const data = await getAllEmployees();
    return NextResponse.json({ message: 'success', data });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // console.log('body:', body);
    const res = await addEmployee(body);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
