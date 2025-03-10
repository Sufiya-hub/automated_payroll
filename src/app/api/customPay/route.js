import { NextResponse } from 'next/server';
import axios from 'axios';
import razorpay from '@/server/payrollService';

const RAZORPAY_KEY = process.env.RAZORPAY_TEST_ID;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

export async function GET() {
  const payload = {
    contact: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact: '9999999999',
      type: 'employee',
    },
    account_type: 'bank_account',
    bank_account: {
      name: 'John Doe',
      ifsc: 'HDFC0001234',
      account_number: '123456789012', // Employee's actual bank account number
    },
  };
  try {
    const payout = await razorpay.payouts.create({
      account_number: '2323230076540008', // Razorpay's virtual account number (for test mode)
      fund_account_id: 'fa_1234567890abcdef', // Create a fund account first
      amount: 50000, // Amount in paise (₹500.00)
      currency: 'INR',
      mode: 'UPI', // Can be NEFT, IMPS, UPI, etc.
      purpose: 'salary',
      queue_if_low_balance: true,
      reference_id: 'salary_txn_001',
      narration: 'Employee Salary - January',
    });
    console.log('Fund Account Created:', payout);
    return NextResponse.json({ payout });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error?.message });
  }
}
