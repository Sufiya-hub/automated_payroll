import { NextResponse } from 'next/server';
import {
  postLeaveRequest,
  getAllLeavesData,
  updateLeaveStatus,
} from '@/server/queries';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { format } from 'date-fns';

export async function GET() {
  try {
    const data = await getAllLeavesData();
    if (!data || data?.message !== 'success') {
      throw new Error({ message: 'failure' });
    }
    return NextResponse.json({ message: 'success', data: data?.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    if (!id) {
      throw new Error({ message: 'failure' });
    }
    const data = await req.json();
    const date = format(new Date(), 'yyyy-MM-dd');
    const res = await postLeaveRequest({ ...data, employeeId: id, date });
    if (res?.message !== 'success') {
      throw new Error('failure');
    }
    return NextResponse.json({ message: 'success', data: res.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    if (!id) {
      throw new Error({ message: 'failure' });
    }
    const updatedData = await updateLeaveStatus(id, status);
    return NextResponse.json({ message: 'success', updatedData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
