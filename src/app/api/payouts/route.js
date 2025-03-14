import { NextResponse } from 'next/server';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  try {
    const idempotencyKey = uuidv4();
    const data = {
      account_number: process.env.ACCOUNT_NUMBER, // COMPANYS GLOBAL
      fund_account_id: 'fa_Q5bH0qADQ1AkII',
      amount: 2000000,
      currency: 'INR',
      mode: 'IMPS',
      purpose: 'salary',
      queue_if_low_balance: true,
      reference_id: 'Acme Transaction ID 12345',
      narration: 'Acme Corp Fund Transfer',
      notes: {
        notes_key_1: 'Employee Salary Credit',
      },
    };

    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');

    await axios
      .post('https://api.razorpay.com/v1/payouts', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
          'X-Payout-Idempotency': idempotencyKey,
          // 'X-Payout-Idempotency': '53cda91c-8f81-4e77-bbb9-7388f4ac6bf4',
        },
      })
      .then((response) => {
        console.log('Success:', response.data);
        return NextResponse.json({ response });
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message
        );
      });
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error?.message });
  }
}
