import { NextResponse } from 'next/server';
import { addDepartment } from '@/server/queries';

export async function GET() {
  try {
    const data = {
      departmentName: 'ECE',
      departmentCode: '23',
      budget: 20,
      workingHours: '4',
      startTime: '9:00 am',
      endTime: '4:00 pm',
      description: 'aaaa',
    };
    await addDepartment(data);
    console.log('Dept added');
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
