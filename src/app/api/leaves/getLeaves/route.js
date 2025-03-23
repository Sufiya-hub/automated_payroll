import { NextResponse } from 'next/server';
import { getLeavesData } from '@/server/queries';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    if (!id) {
      throw new Error({ message: 'failure' });
    }
    const data = await getLeavesData(id);
    if (!data && data?.message !== 'success') {
      throw new Error('failure');
    }
    return NextResponse.json({ message: 'success', data: data?.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
