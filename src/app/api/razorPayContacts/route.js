import razorpay from '@/server/payrollService';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const data = {
      name: 'Kalyan Pendem',
      email: 'kalyanpendem007@example.com',
      contact: '9381034364',
      type: 'employee',
      reference_id: 'Acme Contact ID 12345',
      notes: {
        notes_key_1: 'Employee',
      },
    };

    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');

    axios
      .post('https://api.razorpay.com/v1/contacts', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
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
