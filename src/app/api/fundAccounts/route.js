import { NextResponse } from 'next/server';
import axios from 'axios';
import { addFundAccount, getEmployeeById } from '@/server/queries';

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body) {
      throw new Error('No data provided');
    }

    const employeeData = await getEmployeeById(body.employeeId);
    if (!employeeData) {
      throw new Error('No Employee Data');
    }

    const data = {
      contact_id: employeeData.contact_id,
      account_type: 'bank_account',
      bank_account: {
        name: employeeData.fullName,
        ifsc: body.ifsc,
        account_number: body.account_number,
      },
    };

    let dbData = {
      employeeId: employeeData.id,
      ifsc: body.ifsc,
      account_number: body.account_number,
    };

    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');

    await axios
      .post('https://api.razorpay.com/v1/fund_accounts', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      })
      .then((response) => {
        // console.log('Success:', response.data);
        if (response?.data?.id) dbData.fund_account_number = response.data.id;
      })
      .catch((error) => {
        throw new Error(error?.message);
      });

    await addFundAccount(dbData, body.salary);

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error?.message });
  }
}

// {
//   "id": "fa_Q5Pan7xt1OJUJr",
//   "entity": "fund_account",
//   "contact_id": "cont_Q5PLftx0AnWEsq",
//   "account_type": "bank_account",
//   "bank_account": {
//       "ifsc": "HDFC0000053",
//       "bank_name": "HDFC Bank",
//       "name": "Gaurav Kumar",
//       "notes": [],
//       "account_number": "765432123456789"
//   },
//   "batch_id": null,
//   "active": true,
//   "created_at": 1741680480
// }
