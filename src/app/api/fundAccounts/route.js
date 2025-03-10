import razorpay from '@/server/payrollService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const fundAccount = await razorpay.co.create({
    //       contact_id: 'cont_1234567890abcdef', // Create a contact first
    //       account_type: 'bank_account',
    //       bank_account: {
    //         name: 'John Doe',
    //         ifsc: 'HDFC0001234',
    //         account_number: '123456789012',
    //       },
    //     });

    // instance.accounts.create({
    //   email: 'kalyanpendem007@gmail.com',
    //   phone: '9381034364',
    //   legal_business_name: 'APS',
    //   business_type: 'individual',
    //   customer_facing_business_name: 'Example',
    //   profile: {
    //     category: 'it',
    //     subcategory: 'Saas',
    //     description: 'Healthcare E-commerce platform',
    //     addresses: {
    //       operation: {
    //         street1: '507, Koramangala 6th block',
    //         street2: 'Kormanagala',
    //         city: 'Bengaluru',
    //         state: 'Karnataka',
    //         postal_code: 560047,
    //         country: 'IN',
    //       },
    //       registered: {
    //         street1: '507, Koramangala 1st block',
    //         street2: 'MG Road',
    //         city: 'Bengaluru',
    //         state: 'Karnataka',
    //         postal_code: 560034,
    //         country: 'IN',
    //       },
    //     },
    //     business_model:
    //       'Automated Payroll System',
    //   },
    //   legal_info: {
    //     pan: 'AAACL1234C',
    //   },
    //   brand: {
    //     color: '2A8E9E',
    //   },
    //   notes: {
    //     internal_ref_id: '123123',
    //   },
    //   contact_name: 'Gaurav Kumar',
    //   contact_info: {
    //     chargeback: {
    //       email: 'cb@example.org',
    //     },
    //     refund: {
    //       email: 'cb@example.org',
    //     },
    //     support: {
    //       email: 'support@example.org',
    //       phone: '9999999998',
    //       policy_url: 'https://www.google.com',
    //     },
    //   },
    //   apps: {
    //     websites: ['https://www.example.org'],
    //     android: [
    //       {
    //         url: 'playstore.example.org',
    //         name: 'Example',
    //       },
    //     ],
    //     ios: [
    //       {
    //         url: 'appstore.example.org',
    //         name: 'Example',
    //       },
    //     ],
    //   },
    // });

    // const fundAccount = razorpay.customers.create({
    //   name: 'Gaurav Kumar',
    //   contact: 9123456780,
    //   email: 'gaurav.kumar@example.com',
    //   fail_existing: 0,
    //   notes: {
    //     notes_key_1: 'Tea, Earl Grey, Hot',
    //     notes_key_2: 'Tea, Earl Grey… decaf.',
    //   },
    // });

    // 1. CREATE CUSTOMER ACC FOR EMP
    // const customers = await razorpay.customers.fetch('cust_Q582q8CDx85Ut6');

    // 2. CREATE FUND ACC FOR EMP
    const fundAccount = razorpay.fundAccount.create({
      customer_id: 'cust_Q582q8CDx85Ut6',
      account_type: 'bank_account',
      bank_account: {
        name: 'Gaurav Kumar',
        account_number: '11214311215411',
        ifsc: 'HDFC0000053',
      },
    });

    return NextResponse.json({ fundAccount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error?.message });
  }
}
