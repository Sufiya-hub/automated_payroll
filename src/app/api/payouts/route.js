import { NextResponse } from 'next/server';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user?.position !== 'manager' &&
        session.user?.position !== 'admin')
    ) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body || !body.fund_account_id || !body.amount) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const idempotencyKey = uuidv4();
    const data = {
      account_number: process.env.ACCOUNT_NUMBER, // COMPANYS GLOBAL
      fund_account_id: body.fund_account_id,
      amount: body.amount,
      currency: 'INR',
      mode: 'IMPS',
      purpose: 'salary',
      queue_if_low_balance: true,
      reference_id: `Acme_Payout_${Date.now()}`,
      narration: body.narration || 'Acme Corp Fund Transfer',
      notes: {
        notes_key_1: 'Employee Salary Credit',
      },
    };

    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');

    const responseData = await axios
      .post('https://api.razorpay.com/v1/payouts', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
          'X-Payout-Idempotency': idempotencyKey,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message
        );
        throw new Error(error.message);
      });
    return NextResponse.json({ response: responseData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
