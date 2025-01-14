import { drizzle } from 'drizzle-orm/node-postgres';
import { departmentTable, employeeTable } from './db/schemas';
import { eq, and, or } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);

export const googleLogin = async (email) => {
  try {
    const user = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.email, email));
    console.log(user);
    if (!user || !user?.length > 0) {
      throw new Error("User does't exists");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const user = await db
      .select()
      .from(employeeTable)
      .where(
        and(
          eq(employeeTable.email, email),
          eq(employeeTable.password, password)
        )
      );
    console.log(user);
    if (user) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getManagers = async () => {
  try {
    const data = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.position, 'manager'));
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addManager = async (data) => {
  try {
    let values = { ...data, position: 'manager' };
    await db.insert(employeeTable).values(values);
    return { message: 'Successfully Added' };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const addEmployee = async (data) => {
  db.insert(employeeTable).values(data);
  return { message: 'Successfully Added' };
};

export const addDepartment = async (data) => {
  try {
    console.log(data);
    await db.insert(departmentTable).values(data);
    return { message: 'Successfully Added' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};
