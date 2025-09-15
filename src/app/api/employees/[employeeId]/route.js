import { NextResponse } from 'next/server';
import { getEmployeeById, updateEmployeeById } from '@/server/queries';

export async function GET(request, context) {
  try {
    const { employeeId } = await context.params;
    console.log('context:', employeeId);
    const data = await getEmployeeById(employeeId);
    return NextResponse.json({ data, message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, context) {
  try {
    const { employeeId } = await context.params;
    const body = await request.json();
    const result = await updateEmployeeById(Number(employeeId), body);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
