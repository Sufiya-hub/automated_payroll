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
  {
    label: 'Password',
    bodyKey: 'password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
  },

  {
    label: 'Position',
    bodyKey: 'position',
    type: 'select',
    options: [
      {
        label: 'UI/UX Designer',
        value: 'UI/UX designer',
      },
      {
        label: 'Software Developer',
        value: 'software developer',
      },
      {
        label: 'Tester',
        value: 'tester',
      },
      {
        label: 'Marketing',
        value: 'marketing',
      },
      {
        label: 'HR',
        value: 'hr',
      },
    ],
    placeholder: 'Assign Position',
    required: true,
  },
  {
    label: 'Department',
    bodyKey: 'department',
    type: 'select',
    options: [],
    placeholder: 'Assign department',
    required: true,
  },
  {
    label: 'Status',
    bodyKey: 'status',
    type: 'select',
    options: [
      {
        label: 'Full-Time',
        value: 'Full-Time',
      },
      {
        label: 'Part-Time',
        value: 'Part-Time',
      },
      {
        label: 'Freelancer',
        value: 'Freelancer',
      },
    ],
    placeholder: 'Select status',
    required: true,
  },
  {
    label: 'Employee Image',
    bodyKey: 'employeeImage',
    type: 'file',
    required: true,
  },
];

export const DEPTFORM = [
  {
    label: 'Department Name',
    bodyKey: 'departmentName',
    type: 'text',
    placeholder: 'Enter Department name',
    required: true,
  },
  {
    label: 'Department Code',
    bodyKey: 'departmentCode',
    type: 'text',
    placeholder: 'Enter Department code',
    required: true,
  },
  // {
  //   label: 'Number of Employees',
  //   bodyKey: 'no_of_employees',
  //   type: 'number',
  //   placeholder: 'Enter number of employees',
  //   required: true,
  // },
  // {
  //   label: 'Budget',
  //   bodyKey: 'budget',
  //   type: 'number',
  //   placeholder: 'Enter budget',
  //   required: true,
  // },
  {
    label: 'Working hours',
    bodyKey: 'workingHours',
    type: 'number',
    placeholder: 'Enter number of working hours',
    required: true,
  },
  {
    label: 'Start time',
    bodyKey: 'startTime',
    type: 'time',
    placeholder: 'Enter starting time',
    required: true,
  },
  {
    label: 'End time',
    bodyKey: 'endTime',
    type: 'time',
    placeholder: 'Enter ending time',
    required: true,
  },
  {
    label: 'Description',
    bodyKey: 'description',
    type: 'textarea',
    placeholder: 'Enter Description',
  },
];

export const BANK = [
  {
    label: 'Account Number',
    bodyKey: 'account_number',
    type: 'text',
    placeholder: 'Enter employee Ac.no',
    required: true,
  },
  {
    label: 'IFSC Code',
    bodyKey: 'ifsc',
    type: 'text',
    placeholder: 'Enter employee IFSC code',
    required: true,
  },

  {
    label: 'Salary',
    bodyKey: 'salary',
    type: 'text',
    placeholder: 'Enter employee Salary',
    required: true,
  },
];
