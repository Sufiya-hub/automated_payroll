import { NextResponse } from 'next/server';
import { postLeaveRequest } from '@/server/queries';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    if (!id) {
      throw new Error({ message: 'failure' });
    }
    const data = await req.json();
    const res = await postLeaveRequest({ ...data, employeeId: id });
    if (res?.message !== 'success') {
      throw new Error('failure');
    }
    return NextResponse.json({ message: 'success', data: res.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
