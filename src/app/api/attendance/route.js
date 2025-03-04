import { NextResponse } from 'next/server';
import { uploadAttendance, getUserAttendance } from '@/server/queries';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    // console.log('session in route', session);
    const id = session.user.id;
    const today = new Date().toISOString().split('T')[0];
    // console.log(today);
    const data = {
      employeeId: id,
      attendanceDate: today,
      status: true,
    };
    const res = await uploadAttendance(data);
    // const body = await req.json();

    // {
    //     employeeId,status:true,date
    // }
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function GET() {
  try {
    const data = await getUserAttendance();
    // console.log(data);
    return NextResponse.json({ message: 'success', data });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
