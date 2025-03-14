import { NextResponse } from 'next/server';
import axios from 'axios';
import Stripe from 'stripe';

// const STRIPE_SECRET = process.env.STRIPE_SECRET;

// const stripe = new Stripe(STRIPE_SECRET, { apiVersion: '2024-04-10' });

export async function GET() {
  try {
    // const employeeAccount = await stripe.accounts.create({
    //   type: 'express',
    //   country: 'US',
    //   email: 'sufiyapattan4@gmail.com',
    // });
    console.log(employeeAccount.id);
    return NextResponse.json({ employeeAccount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error?.message });
  }
}
