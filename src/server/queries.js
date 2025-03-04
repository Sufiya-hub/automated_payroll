import { drizzle } from 'drizzle-orm/node-postgres';
import { attendanceTable, departmentTable, employeeTable } from './db/schemas';
import { eq, and, or, gte, lt } from 'drizzle-orm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
const db = drizzle(process.env.DATABASE_URL);

export const googleLogin = async (email) => {
  try {
    const user = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.email, email));
    // console.log(user);
    if (!user || !user?.length > 0) {
      throw new Error("User does't exists");
    }
    // console.log('user:', user);
    return user[0];
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
  try {
    console.log('add emp:', data);
    await db.insert(employeeTable).values(data);
    return { message: 'Successfully Added' };
  } catch (error) {
    console.log('error:', error);
    return { message: 'error' };
  }
};

export const getDepartments = async (data) => {
  try {
    const dept = await db.select().from(departmentTable);
    console.log('deps:', dept);
    return dept;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
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

export const uploadAttendance = async (data) => {
  try {
    console.log(data);
    await db.insert(attendanceTable).values(data);
    return { message: 'Successfully' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getAllEmployees = async (data) => {
  try {
    const data = await db.select().from(employeeTable);
    return data;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getUserAttendance = async (data) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log('uid:', session.user.id);
    const requiredYear = new Date().getFullYear();
    const requiredMonth = new Date().getMonth() + 1;
    const attendance = await db
      .select({ attendanceDate: attendanceTable.attendanceDate })
      .from(attendanceTable)
      .where(
        and(
          eq(attendanceTable.status, true),
          eq(attendanceTable.employeeId, session?.user?.id),
          gte(
            attendanceTable.attendanceDate,
            `${requiredYear}-${requiredMonth.toString().padStart(2, '0')}-01`
          ),
          lt(
            attendanceTable.attendanceDate,
            `${requiredYear}-${(requiredMonth + 1)
              .toString()
              .padStart(2, '0')}-01`
          )
        )
      );
    return attendance;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};
