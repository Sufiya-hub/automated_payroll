import { NextResponse } from 'next/server';
import {
  getEmpLeaves,
  getFundAccountId,
  getFundAccountNumber,
  getPayrollEmployees,
  postPayroll,
  updateEmpLeaves,
  getSalaryComponents,
  getProfessionalTax,
} from '@/server/queries';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ProfessionalTax from '@/components/admin/ProfessionalTax';

function calculateIncomeTax(monthlyNetSalary) {
  const annualNetSalary = monthlyNetSalary * 12;
  let taxableIncome = annualNetSalary;
  let tax = 0;

  if (taxableIncome <= 1200000) {
    tax = 0; // No tax for income up to 12,00,000
  } else if (taxableIncome <= 1600000) {
    tax = (taxableIncome - 1200000) * 0.15;
  } else if (taxableIncome <= 2000000) {
    tax = 400000 * 0.15 + (taxableIncome - 1600000) * 0.2;
  } else if (taxableIncome <= 2400000) {
    tax = 400000 * 0.15 + 400000 * 0.2 + (taxableIncome - 2000000) * 0.25;
  } else {
    tax =
      400000 * 0.15 +
      400000 * 0.2 +
      400000 * 0.25 +
      (taxableIncome - 2400000) * 0.3;
  }

  const cess = tax * 0.04; // 4% Health & Education Cess
  const totalAnnualTax = tax + cess;
  const monthlyTax = totalAnnualTax / 12;

  return monthlyTax;
}

// const salaryCalc = async (
//   // gross,
//   basic,
//   leaves,
//   totalLeaves,
//   employeeId,
//   salaryComponents,
//   professionalTax
// ) => {
//   if (!basic) return;

//   // GROSS
//   // const basic = Math.floor(gross * (50 / 100));
//   // const da = basic * (75 / 100);
//   // const hra = basic * (15 / 100);
//   // const allowances = basic * (10 / 100);

//   // Prev basic cal
//   // const basic = Math.floor(gross * (salaryComponents.basic / 100));
//   const da = basic * ((salaryComponents?.da || 75) / 100);
//   const hra = basic * ((salaryComponents?.hra || 15) / 100);
//   const allowances = basic * ((salaryComponents?.otherAllowances || 10) / 100);
//   const gross = basic + da + hra + allowances;

//   // DEDUCTIONS
//   const pf = Math.floor(basic * ((salaryComponents?.pf || 12) / 100));
//   // const pt = gross < 15000 ? 0 : gross < 20000 ? 150 : 200;
//   let pt = 0;
//   for (const item in professionalTax) {
//     if (gross >= item?.minValue && gross <= item?.maxValue) {
//       pt = item?.value;
//     }
//   }

//   const deductions = pf + pt;

//   // net * 12 = 10,80,000 * 14%
//   // NET
//   let net = Math.floor(gross - deductions);
//   const tax = calculateIncomeTax(net);
//   net -= Math.floor(tax);

//   // LOL
//   // (totalfalse) - x
//   //  if(totalfalse > x) net - (gross//30 * (totalfalse % x))
//   let excessLeaves = 0;
//   if (totalLeaves > leaves) {
//     net = Math.floor(net - Math.floor(gross / 30) * (totalLeaves % leaves));
//     await updateEmpLeaves(employeeId, totalLeaves);
//   }
//   const results = {
//     basic,
//     da,
//     hra,
//     allowances,
//     gross,
//     pf,
//     pt,
//     deductions,
//     net,
//     tax,
//   };
//   console.log('results:', results);
//   return results;
// };

// const salaryCalc = async (
//   basic,
//   leaves,
//   totalLeaves,
//   employeeId,
//   salaryComponents,
//   professionalTax
// ) => {
//   if (basic == null) return;

//   const da = basic * ((salaryComponents?.da ?? 75) / 100);
//   const hra = basic * ((salaryComponents?.hra ?? 15) / 100);
//   const allowances = basic * ((salaryComponents?.otherAllowances ?? 10) / 100);
//   const gross = basic + da + hra + allowances;

//   const pf = Math.floor(basic * ((salaryComponents?.pf ?? 12) / 100));

//   // Professional Tax Slab Logic Fix
//   let pt = 0;
//   for (const item of professionalTax) {
//     if (gross >= item.minValue && gross <= item.maxValue) {
//       pt = item.value;
//       break;
//     }
//   }

//   const deductions = pf + pt;

//   let net = Math.floor(gross - deductions);

//   const tax = calculateIncomeTax(net);
//   net -= Math.floor(tax);

//   if (totalLeaves > leaves) {
//     const excessLeaves = totalLeaves - leaves;
//     const perDaySalary = gross / 30;
//     net -= Math.floor(perDaySalary * excessLeaves);
//     await updateEmpLeaves(employeeId, totalLeaves);
//   }

//   const results = {
//     basic,
//     da,
//     hra,
//     allowances,
//     gross,
//     pf,
//     pt,
//     deductions,
//     net,
//     tax,
//   };

//   console.log('results:', results);
//   return results;
// };

// const salaryCalc = async (
//   gross,
//   leaves,
//   totalLeaves,
//   employeeId,
//   salaryComponents,
//   professionalTax
// ) => {
//   if (gross == null) return;

//   const basic = gross * (50 / 100);
//   const da = basic * ((salaryComponents?.da ?? 75) / 100);
//   const hra = basic * ((salaryComponents?.hra ?? 15) / 100);
//   const allowances = basic * ((salaryComponents?.otherAllowances ?? 10) / 100);
//   //const gross = basic + da + hra + allowances;

//   const pf = Math.floor(basic * ((salaryComponents?.pf ?? 12) / 100));

//   // Professional Tax Slab Logic Fix
//   let pt = 0;
//   for (const item of professionalTax) {
//     if (gross >= item.minValue && gross <= item.maxValue) {
//       pt = item.value;
//       break;
//     }
//   }

//   const deductions = pf + pt;

//   let net = Math.floor(gross - deductions);

//   const tax = calculateIncomeTax(gross);
//   net -= Math.floor(tax);

//   if (totalLeaves > leaves) {
//     const excessLeaves = totalLeaves - leaves;
//     const perDaySalary = gross / 30;
//     net -= Math.floor(perDaySalary * excessLeaves);
//     await updateEmpLeaves(employeeId, totalLeaves);
//   }

//   const results = {
//     basic,
//     da,
//     hra,
//     allowances,
//     gross,
//     pf,
//     pt,
//     deductions,
//     net,
//     tax,
//   };

//   console.log('results:', results);
//   return results;
// };

const salaryCalc = async (
  gross,
  leaves,
  totalLeaves,
  employeeId,
  salaryComponents,
  professionalTax
) => {
  if (gross == null) return;

  const totalDaysInMonth = 30;
  const presentDays = Math.max(0, totalDaysInMonth - totalLeaves);
  const perDayGross = gross / totalDaysInMonth;

  // Pay only for actual present days
  const actualGross = perDayGross * presentDays;

  const basic = gross * (50 / 100);
  const da = basic * ((salaryComponents?.da ?? 75) / 100);
  const hra = basic * ((salaryComponents?.hra ?? 15) / 100);
  const allowances = basic * ((salaryComponents?.otherAllowances ?? 10) / 100);

  const pf = Math.floor(basic * ((salaryComponents?.pf ?? 12) / 100));

  // Professional Tax based on actual gross
  let pt = 0;
  if (professionalTax && professionalTax.length > 0)
    for (const item of professionalTax) {
      if (actualGross >= item.minValue && actualGross <= item.maxValue) {
        pt = item.value;
        break;
      }
    }

  const tax = calculateIncomeTax(gross); // Based on full monthly gross
  const deductions = pf + pt + Math.floor(tax);

  let net = Math.floor(actualGross - deductions);

  // If no attendance, no salary
  if (presentDays === 0) {
    await updateEmpLeaves(employeeId, totalLeaves);
    return {
      basic: basic || 0,
      da: da || 0,
      hra: hra || 0,
      allowances: allowances || 0,
      gross: gross || 0,
      pf: pf || 0,
      pt: pt || 0,
      tax: tax || 0,
      deductions: deductions || 0,
      net: 0,
      presentDays: presentDays || 0,
      totalLeaves: totalLeaves || 0,
    };
  }

  // Deduct for excess leaves if any (beyond allowed)
  if (totalLeaves > leaves) {
    const excessLeaves = totalLeaves - leaves;
    const excessLeaveDeduction = Math.floor(perDayGross * excessLeaves);
    net -= excessLeaveDeduction;
  }

  await updateEmpLeaves(employeeId, totalLeaves);

  const results = {
    basic: basic || 0,
    da: da || 0,
    hra: hra || 0,
    allowances: allowances || 0,
    gross: actualGross || 0,
    pf: pf || 0,
    pt: pt || 0,
    tax: tax || 0,
    deductions: deductions || 0,
    net: net || 0,
    presentDays: presentDays || 0,
    totalLeaves: totalLeaves || 0,
  };

  console.log('results:', results);
  return results;
};

const data = salaryCalc(20000);
console.log(data);

export async function GET() {
  try {
    const employees = await getPayrollEmployees();
    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');

    const salaryComponentsData = await getSalaryComponents();
    const professionalTaxData = await getProfessionalTax();
    if (
      !salaryComponentsData ||
      !professionalTaxData ||
      salaryComponentsData?.message !== 'success' ||
      professionalTaxData?.message !== 'success'
    ) {
      throw new Error('No Dynamic Payscales found');
    }
    const salaryComponents = salaryComponentsData.data[0];
    const professionalTax = professionalTaxData.data;
    console.log('professionalTax:', professionalTax);

    employees.forEach(async (emp) => {
      const idempotencyKey = uuidv4();
      const totalLeaves = await getEmpLeaves(emp.id);
      const fund_account_number = await getFundAccountNumber(emp.id);
      let transaction_status = null;
      if (fund_account_number) {
        const paydivision = await salaryCalc(
          emp.salary,
          emp.leaves,
          totalLeaves,
          emp.id,
          salaryComponents,
          professionalTax
        );

        const transaction_data = {
          account_number: process.env.ACCOUNT_NUMBER, // COMPANYS GLOBAL
          fund_account_id: fund_account_number,
          // amount: emp.salary,
          amount: paydivision.net,
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

        const transaction_res = await axios
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
            transaction_status = 'success';
            return response.data;
            // return NextResponse.json({ response });
          })
          .catch((error) => {
            console.error(
              'Error:',
              error.response ? error.response.data : error.message
            );
          });
        // if (transaction_status === 'success') {
        //   const dbData = {
        //     employeeId: emp.id,
        //     transactionId: transaction_res.id,
        //     amount: transaction_res.amount,
        //     fund_account_number: transaction_res.fund_account_id,
        //     status: 'success',
        //     purpose: 'salary',
        //     tax: paydivision.tax,
        //   };
        //   await postPayroll(dbData);
        // }
        if (transaction_status === 'success' && transaction_res) {
          const dbData = {
            employeeId: emp.id,
            transactionId: transaction_res.id,
            amount: transaction_res.amount,
            fund_account_number: transaction_res.fund_account_id,
            status: 'success',
            purpose: 'salary',
            tax: paydivision.tax,
          };

          // Skip if essential fields are missing
          if (
            !dbData.transactionId ||
            !dbData.amount ||
            !dbData.fund_account_number
          ) {
            console.warn(
              `Skipping DB insert for emp ${emp.id}: Incomplete data`,
              dbData
            );
          } else {
            await postPayroll(dbData);
          }
        }
      }
    });

    return NextResponse.json({ message: 'success of payouts' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
