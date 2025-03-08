import { NextResponse } from 'next/server';
import { getPayrollEmployees } from '@/server/queries';

// 1.Gross Salary = Basic Salary + Allowances +Overtime Pay
// 2.Net Salary = Gross Salary − Deductions

// Components:
// Basic Salary – Fixed part of salary (typically 40-50% of Gross)
// House Rent Allowance (HRA) – Usually 40% (non-metro) or 50% (metro) of Basic
// Dearness Allowance (DA) – Cost of living adjustment (applicable in some sectors)
// Other Allowances – Travel, Medical, Food, etc.
// Overtime Pay – Extra pay for working beyond standard hours

// Deductions:
// Provident Fund (PF) – 12% of Basic Salary (Employer may also contribute 12%)
// Professional Tax (PT) – Varies by state in India
// Income Tax (TDS) – Based on annual taxable income
// Employee State Insurance (ESI) – 1.75% of Gross Salary (if applicable)

const salaryCalc = (basic) => {
  if (!basic) return;

  // GROSS
  const da = basic * (75 / 100);
  const hra = basic * (14 / 100);
  const allowances = basic * (10 / 100);
  const gross = basic + da + hra + allowances;

  // DEDUCTIONS
  const pf = basic * (12 / 100);
  const pt = basic < 15000 ? 0 : basic < 20000 ? 150 : 200;
  const deductions = pf + pt;

  // NET
  const net = gross - deductions;
  return { basic, da, hra, allowances, gross, pf, pt, deductions, net };
};

export async function POST() {
  try {
    const data = await getPayrollEmployees();
    console.log(data);
    const payroll = data.map((record) => ({
      ...record,
      final: salaryCalc(record.salary),
    }));
    return NextResponse.json(payroll);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
