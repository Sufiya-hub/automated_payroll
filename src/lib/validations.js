import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const employeeSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    errorMap: () => ({ message: 'Invalid marital status' }),
  }),
  religion: z.string().min(2, 'Religion is required'),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
  mobile: z.string().regex(/^\d{10}$/, 'Mobile must be a 10-digit number'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
  salary: z.coerce
    .number()
    .min(0, 'Salary must be a positive number')
    .optional(),
  // leaves: z.coerce.number().min(0).optional(),
});
