import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const employeeTable = pgTable('employees', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar({ length: 255 }).notNull(),
  gender: varchar({ length: 10 }).notNull(),
  maritalStatus: varchar({ length: 10 }).notNull(),
  religion: varchar({ length: 10 }).notNull(),
  birthDate: varchar({ length: 10 }).notNull(),
  mobile: varchar({ length: 10 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  salary: integer(),
});

export const managerTable = pgTable('managers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar({ length: 255 }).notNull(),
  gender: varchar({ length: 10 }).notNull(),
  maritalStatus: varchar({ length: 10 }).notNull(),
  religion: varchar({ length: 10 }).notNull(),
  birthDate: varchar({ length: 10 }).notNull(),
  mobile: varchar({ length: 10 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  salary: integer(),
});
