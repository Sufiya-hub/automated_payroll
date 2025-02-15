import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { parseParameter } from 'next/dist/shared/lib/router/utils/route-regex';

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
  salary: integer(),
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
