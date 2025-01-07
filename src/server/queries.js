import { drizzle } from 'drizzle-orm/node-postgres';
import { employeeTable, managerTable } from './db/schemas';

const db = drizzle(process.env.DATABASE_URL);

export const addManager = async (data) => {
  await db.insert(managerTable).values(data);
  return { message: 'Successfully Added' };
};

export const addEmployee = async (data) => {
  await db.insert(employeeTable).values(data);
  return { message: 'Successfully Added' };
};
