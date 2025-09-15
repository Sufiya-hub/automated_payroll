import { double, float, int } from 'drizzle-orm/mysql-core';
import {
  integer,
  pgTable,
  varchar,
  date,
  serial,
  boolean,
  time,
  timestamp,
} from 'drizzle-orm/pg-core';

export const employeeTable = pgTable('employees', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar({ length: 255 }).notNull(),
  position: varchar({ length: 20 }).notNull(),
  department: varchar({ length: 30 }).notNull(),
  gender: varchar({ length: 10 }).notNull(),
  maritalStatus: varchar({ length: 10 }).notNull(),
  religion: varchar({ length: 10 }).notNull(),
  birthDate: varchar({ length: 10 }).notNull(),
  mobile: varchar({ length: 10 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 30 }).notNull(),
  status: varchar({ length: 30 }).notNull(),
  leaves: integer().default(15),
  salary: integer(),
  image: varchar(),
  isFundAccountAdded: boolean().default(false),
  contact_id: varchar({ length: 19 }),
  loginOtp: varchar({ length: 6 }),
  loginOtpExpires: timestamp(),
  last_login: timestamp(),
});

export const departmentTable = pgTable('department', {
  departmentId: integer().primaryKey().generatedAlwaysAsIdentity(),
  departmentName: varchar({ length: 20 }).notNull(),
  departmentCode: varchar({ length: 10 }).unique().notNull(),
  budget: integer().default(0),
  workingHours: integer(),
  startTime: varchar(),
  endTime: varchar(),
  description: varchar({ length: 200 }),
});

export const attendanceTable = pgTable('attendance', {
  id: serial('id').primaryKey(),
  employeeId: integer('employeeid')
    .notNull()
    .references(() => employeeTable.id),
  attendanceDate: date('attendance_date').notNull(),
  status: boolean('status').default(false),
});

export const bankTable = pgTable('bank', {
  id: serial('id').primaryKey(),
  employeeId: integer('employeeid')
    .notNull()
    .references(() => employeeTable.id),
  ifsc: varchar({ length: 11 }),
  account_number: varchar({ length: 15 }),
  fund_account_number: varchar({ length: 17 }),
});

export const payrollTable = pgTable('payroll', {
  id: serial('id').primaryKey(),
  employeeId: integer('employeeid')
    .notNull()
    .references(() => employeeTable.id),
  transactionId: varchar({ length: 19 }),
  amount: varchar(),
  fund_account_number: varchar({ length: 17 }),
  status: varchar(),
  purpose: varchar(),
  tax: integer(),
  date: date().notNull(),
  merchant_id: varchar({ length: 14 }),
});

export const notifTable = pgTable('notifs', {
  id: serial('id').primaryKey(),
  message: varchar(),
  date: date('date').notNull(),
  // startTime: time(),
  // endTime: time(),
  startTime: varchar(),
  endTime: varchar(),
  ip: varchar(),
  setting: varchar(),
  rootLatitude: varchar(),
  rootLongitude: varchar(),
  radius: integer().default(10),
});

export const salaryComponentTable = pgTable('salaryComponents', {
  id: serial('id').primaryKey(),
  basic: integer().default(50),
  da: integer().default(75),
  hra: integer().default(15),
  otherAllowances: integer().default(10),
  pf: integer().default(12),
});

export const professionalTaxTable = pgTable('professionalTax', {
  id: serial('id').primaryKey(),
  minValue: integer().default(0),
  maxValue: integer().default(null),
  value: integer().default(0),
});

export const leavesTable = pgTable('leavesTable', {
  id: serial('id').primaryKey(),
  employeeId: integer('employeeid')
    .notNull()
    .references(() => employeeTable.id),
  purpose: varchar().notNull(),
  date: date().notNull(),
  from: date().notNull(),
  to: date().notNull(),
  body: varchar(),
  status: varchar().default('pending'),
});

// Global configuration key-value store
export const configTable = pgTable('config', {
  key: varchar({ length: 50 }).primaryKey(),
  value: varchar({ length: 255 }),
});
