import { NextResponse } from 'next/server';
import { postAttendanceNotif, getAttendanceNotif } from '@/server/queries';

export async function GET() {
  try {
    const data = await getAttendanceNotif();
    if (!data && data?.message !== 'success' && data?.data?.length === 0)
      throw new Error('No attendace requests');
    console.log('at reqs:', data);
    return NextResponse.json({ message: 'success', data: data.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ip = body?.ip;
    if (!ip) {
      throw new Error('No Ip found');
    }
    const response = await postAttendanceNotif(ip);
    if (response.message !== 'success')
      throw new Error('Error in storing Notif');
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
