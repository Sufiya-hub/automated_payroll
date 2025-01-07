export const FAQ = [
  {
    que: 'What is an automated payroll system?',
    ans: 'An automated payroll system streamlines the payroll process by calculating employee wages, deductions, taxes, and other payments automatically, ensuring timely and accurate payouts.',
  },
  {
    que: 'Is this system suitable for small businesses?',
    ans: 'Absolutely. The system is scalable and can handle payroll for businesses of all sizes.',
  },
  {
    que: 'Can the system generate payroll reports?',
    ans: 'Yes, the system generates comprehensive payroll reports for auditing, tax filing, and analysis.',
  },
  {
    que: 'Can the system manage benefits and deductions?',
    ans: 'Yes, it can process benefits like health insurance and retirement plans, along with deductions.',
  },
  {
    que: 'Can employees view their payslips?',
    ans: 'Yes, employees can access their payslips and payment history through the self-service portal.',
  },
];

export const SALARY = [
  {
    name: 'Basic',
    amount: '₹ 30,000.00',
  },
  {
    name: 'Leave Encashment',
    amount: '₹ 2,980.00',
  },
  {
    name: 'HRA',
    amount: '₹ 15,000.00',
  },
  {
    name: 'Other Allowance',
    amount: '₹ 10,000.00',
  },
  {
    name: 'SPL Allownace',
    amount: '₹ 15,000.00',
  },
];

export const DEDU = [
  {
    name: 'Employee PF Contribution',
    amount: '₹ 3,000.00',
  },
  {
    name: 'Income Tax',
    amount: '₹ 1,000.00',
  },
  {
    name: 'Insurance',
    amount: '₹ 1,500.00',
  },
];

export const EMPLOYEEFORM = [
  {
    label: 'Full Name',
    bodyKey: 'fullName',
    type: 'text',
    placeholder: 'Enter full name',
    required: true,
  },
  {
    label: 'Gender',
    bodyKey: 'gender',
    type: 'select',
    placeholder: 'Select gender',
    options: [
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Female',
        value: 'female',
      },
    ],
    required: true,
  },
  {
    label: 'Marital Status',
    bodyKey: 'maritalStatus',
    type: 'select',
    placeholder: 'Select marital status',
    required: true,
    options: [
      {
        label: 'Single',
        value: 'single',
      },
      {
        label: 'Married',
        value: 'married',
      },
    ],
  },
  {
    label: 'Religion',
    bodyKey: 'religion',
    type: 'text',
    placeholder: 'Enter religion',
    required: true,
  },
  {
    label: 'Birth Date',
    bodyKey: 'birthDate',
    type: 'date',
    placeholder: 'Enter birthdate',
    required: true,
  },
  {
    label: 'Mobile',
    bodyKey: 'mobile',
    type: 'tel',
    placeholder: 'Enter mobile number',
    required: true,
  },
  {
    label: 'Email',
    bodyKey: 'email',
    type: 'email',
    placeholder: 'Enter email',
    required: true,
  },
];
