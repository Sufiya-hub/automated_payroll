import { NextResponse } from 'next/server';
import { getEmployeeById } from '@/server/queries';

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
