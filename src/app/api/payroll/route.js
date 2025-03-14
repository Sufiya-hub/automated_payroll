import { NextResponse } from 'next/server';
import {
  getEmpLeaves,
  getFundAccountId,
  getFundAccountNumber,
  getPayrollEmployees,
  updateEmpLeaves,
} from '@/server/queries';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function calculateIncomeTax(monthlyNetSalary) {
  const annualNetSalary = monthlyNetSalary * 12;
  // const standardDeduction = 50000;
  const taxableIncome = annualNetSalary;

  let tax = 0;

  if (taxableIncome <= 300000) {
    tax = 0;
  } else if (taxableIncome <= 600000) {
    tax = (taxableIncome - 300000) * 0.05;
  } else if (taxableIncome <= 900000) {
    tax = 300000 * 0.05 + (taxableIncome - 600000) * 0.1;
  } else if (taxableIncome <= 1200000) {
    tax = 300000 * 0.05 + 300000 * 0.1 + (taxableIncome - 900000) * 0.15;
  } else if (taxableIncome <= 1500000) {
    tax =
      300000 * 0.05 +
      300000 * 0.1 +
      300000 * 0.15 +
      (taxableIncome - 1200000) * 0.2;
  } else {
    tax =
      300000 * 0.05 +
      300000 * 0.1 +
      300000 * 0.15 +
      300000 * 0.2 +
      (taxableIncome - 1500000) * 0.3;
  }

  let cess = tax * 0.04;
  let totalAnnualTax = tax + cess;
  let monthlyTax = totalAnnualTax / 12;

  // return {
  //     annualTax: Math.round(totalAnnualTax),
  //     monthlyTax: Math.round(monthlyTax),
  //     netSalaryAfterTax: Math.round(monthlyNetSalary - monthlyTax)
  // };
  return monthlyTax;
}

const salaryCalc = async (gross, leaves, totalLeaves, employeeId) => {
  if (!gross) return;

  // GROSS
  const basic = Math.floor(gross * (50 / 100));
  const da = basic * (75 / 100);
  const hra = basic * (15 / 100);
  const allowances = basic * (10 / 100);
  // const gross = basic + da + hra + allowances;

  // DEDUCTIONS
  const pf = Math.floor(basic * (12 / 100));
  const pt = gross < 15000 ? 0 : gross < 20000 ? 150 : 200;
  const deductions = pf + pt;

  // net * 12 = 10,80,000 * 14%
  // NET
  let net = gross - deductions;
  const tax = calculateIncomeTax(net);
  net -= tax;

  // LOL
  // (totalfalse) - x
  //  if(totalfalse > x) net - (gross//30 * (totalfalse % x))
  let excessLeaves = 0;
  if (totalLeaves > leaves) {
    net = net - Math.floor(gross / 30) * (totalLeaves % leaves);
    await updateEmpLeaves(employeeId, totalLeaves);
  }
  return { basic, da, hra, allowances, gross, pf, pt, deductions, net, tax };
};

export async function GET() {
  try {
    const employees = await getPayrollEmployees();
    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');
    // console.log(employees);
    // await getEmpLeaves(10);
    const payroll = await Promise.all(
      employees.map(async (emp) => {
        const totalLeaves = await getEmpLeaves(emp.id);
        return {
          ...emp,
          final: salaryCalc(emp.salary, emp.leaves, totalLeaves, emp.id), // Use the fetched leaves
        };
      })
    );

    // for (let emp in payroll) {
    //   const

    // }

    employees.forEach(async (emp) => {
      const idempotencyKey = uuidv4();
      const fund_account_number = await getFundAccountNumber(emp.id);
      if (fund_account_number) {
        const transaction_data = {
          account_number: process.env.ACCOUNT_NUMBER, // COMPANYS GLOBAL
          fund_account_id: fund_account_number,
          amount: emp.salary,
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

        await axios
          .post('https://api.razorpay.com/v1/payouts', transaction_data, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${auth}`,
              'X-Payout-Idempotency': idempotencyKey,
              // 'X-Payout-Idempotency': '53cda91c-8f81-4e77-bbb9-7388f4ac6bf4',
            },
          })
          .then((response) => {
            console.log('Success:', response.data);
            // return NextResponse.json({ response });
          })
          .catch((error) => {
            console.error(
              'Error:',
              error.response ? error.response.data : error.message
            );
          });
      }
    });

    return NextResponse.json(payroll);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
