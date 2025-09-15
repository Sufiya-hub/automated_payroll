import { drizzle } from 'drizzle-orm/node-postgres';
import {
  attendanceTable,
  departmentTable,
  employeeTable,
  bankTable,
  payrollTable,
  notifTable,
  configTable,
  salaryComponentTable,
  professionalTaxTable,
  leavesTable,
} from './db/schemas';
import {
  eq,
  and,
  or,
  gte,
  lt,
  lte,
  desc,
  between,
  sql,
  ne,
  exists,
  isNotNull,
} from 'drizzle-orm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { format, addMinutes, isWithinInterval, parse } from 'date-fns';

const db = drizzle(process.env.DATABASE_URL);

export const googleLogin = async (email) => {
  try {
    const user = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.email, email));

    if (!user || user.length === 0) {
      throw new Error("User doesn't exist");
    }

    return user[0];
  } catch (error) {
    console.error('Google login error:', error);
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
    // console.log('in login:', user);
    if (user?.[0]) return user[0];
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const setLoginOtp = async (email, code, expiresAt) => {
  try {
    await db
      .update(employeeTable)
      .set({ loginOtp: code, loginOtpExpires: expiresAt })
      .where(eq(employeeTable.email, email));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyLoginOtp = async (email, code) => {
  try {
    const users = await db
      .select({
        loginOtp: employeeTable.loginOtp,
        loginOtpExpires: employeeTable.loginOtpExpires,
        id: employeeTable.id,
        position: employeeTable.position,
        image: employeeTable.image,
        fullName: employeeTable.fullName,
        salary: employeeTable.salary,
        email: employeeTable.email,
      })
      .from(employeeTable)
      .where(eq(employeeTable.email, email));
    const user = users?.[0];
    if (!user) return false;
    if (!user.loginOtp || !user.loginOtpExpires) return false;
    const now = new Date();
    const exp = new Date(user.loginOtpExpires);
    if (now > exp) return false;
    if (user.loginOtp !== code) return false;
    // Clear OTP after use
    await db
      .update(employeeTable)
      .set({ loginOtp: null, loginOtpExpires: null })
      .where(eq(employeeTable.email, email));
    return {
      id: user.id,
      email: user.email,
      position: user.position,
      image: user.image,
      fullName: user.fullName,
      salary: user.salary,
    };
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
    // console.log('add emp:', data);
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
    // console.log('deps:', dept);
    return dept;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const addDepartment = async (data) => {
  try {
    // console.log(data);
    await db.insert(departmentTable).values(data);
    return { message: 'Successfully Added' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const uploadAttendance = async (data) => {
  try {
    // console.log(data);
    await db.insert(attendanceTable).values(data);
    return { message: 'Successfully' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const adminAttendanceRequest = async (data, date) => {
  try {
    // data.map((emp) => {
    //   const values = {
    //     employeeId: emp.id,
    //     attendanceDate: date,
    //     status: false
    //   }
    //   await db.insert(attendanceTable).values(values);
    // })
    for (const emp of data) {
      const values = {
        employeeId: emp.id,
        attendanceDate: date,
        status: false,
      };
      await db.insert(attendanceTable).values(values);
    }
    console.log('success records creation');
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const makeAttendance = async (id, date) => {
  try {
    await db
      .update(attendanceTable)
      .set({ status: true })
      .where(
        and(
          eq(attendanceTable.employeeId, id),
          eq(attendanceTable.attendanceDate, date)
        )
      );
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getAllEmployees = async () => {
  try {
    const data = await db.select().from(employeeTable);
    return data;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getEmployeeStats = async () => {
  try {
    const data = await db
      .select({
        totalEmployees: sql`COUNT(*)`,
        maleEmployees: sql`COUNT(*) FILTER (WHERE gender = 'male')`,
        femaleEmployees: sql`COUNT(*) FILTER (WHERE gender = 'female')`,
        noFundAccount: sql`COUNT(*) FILTER (WHERE "isFundAccountAdded" = false)`,
      })
      .from(employeeTable);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getEmployeeById = async (id) => {
  try {
    const data = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.id, id));
    if (data?.[0]) {
      return data[0];
    } else {
      throw new Error('No Employee Found');
    }
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getUserAttendance = async () => {
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

export const getPayrollEmployees = async () => {
  try {
    const data = await db
      .select({
        id: employeeTable.id,
        fullName: employeeTable.fullName,
        salary: employeeTable.salary,
      })
      .from(employeeTable);
    return data;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getEmpLeaves = async (id) => {
  try {
    const curyear = new Date().getFullYear();
    const curmonth = new Date().getMonth();
    const leaves = await db
      .select({ count: sql`count(*)` })
      .from(attendanceTable)
      .where(
        and(
          eq(attendanceTable.employeeId, id),
          eq(attendanceTable.status, false),
          gte(attendanceTable.attendanceDate, `${curyear}-${curmonth}-01`),
          lte(attendanceTable.attendanceDate, `${curyear}-${curmonth}-31`)
        )
      );
    // console.log({ leaves: data });
    if (!leaves) throw new Error('no data');
    return leaves[0].count;
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const updateEmpLeaves = async (id, newLeaves) => {
  try {
    await db
      .update(employeeTable)
      .set({ leaves: newLeaves })
      .where(eq(employeeTable.id, id));

    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const addFundAccount = async (data, salary) => {
  try {
    await db.insert(bankTable).values(data);
    await db
      .update(employeeTable)
      .set({ salary: salary, isFundAccountAdded: true })
      .where(eq(employeeTable.id, data.employeeId));
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getFundAccountNumber = async (id) => {
  try {
    const data = await db
      .select({ fund_account_number: bankTable.fund_account_number })
      .from(bankTable)
      .where(eq(bankTable.employeeId, id));
    console.log('chL', data);
    if (data?.[0]) {
      return data[0]?.fund_account_number;
    }
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const postPayroll = async (data) => {
  try {
    await db
      .insert(payrollTable)
      .values({ ...data, date: format(new Date(), 'yyyy-MM-dd') });
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

// where(eq(PayrollTable.employeeId,employeeId.id))
export const getAllPayrolls = async () => {
  try {
    const data = await db
      .select({
        payrollId: payrollTable.id,
        employeeId: payrollTable.employeeId,
        amount: payrollTable.amount,
        fullName: employeeTable.fullName,
        transactionId: payrollTable.transactionId,
        status: payrollTable.status,
        purpose: payrollTable.purpose,
      })
      .from(payrollTable)
      .fullJoin(employeeTable, eq(payrollTable.employeeId, employeeTable.id))
      .where(isNotNull(payrollTable.employeeId));

    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getPayrollsById = async (id) => {
  try {
    const data = await db
      .select({
        id: payrollTable.id,
        tax: payrollTable.tax,
        date: payrollTable.date,
        amount: payrollTable.amount,
        purpose: payrollTable.purpose,
      })
      .from(payrollTable)
      .where(eq(payrollTable.employeeId, id));
    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getAttendanceNotif = async () => {
  try {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const currentTime = format(new Date(), 'HH:mm');

    const data = await db
      .select()
      .from(notifTable)
      .where(and(eq(notifTable.date, currentDate)));

    const filteredData = data.filter(({ startTime, endTime }) =>
      isWithinInterval(parse(currentTime, 'HH:mm', new Date()), {
        start: parse(startTime, 'HH:mm', new Date()),
        end: parse(endTime, 'HH:mm', new Date()),
      })
    );

    // console.log('notifs:', filteredData);
    return { message: 'success', data: filteredData };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const postAttendanceNotif = async (ip) => {
  try {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const currentTime = format(new Date(), 'HH:mm');
    const endTime = format(addMinutes(new Date(), 15), 'HH:mm');

    await db.insert(notifTable).values({
      message: 'attendance acticated',
      date: currentDate,
      startTime: currentTime,
      endTime,
      ip,
      setting: 'ip',
    });

    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getAttendanceRadius = async () => {
  try {
    const data = await db
      .select({ value: configTable.value })
      .from(configTable)
      .where(eq(configTable.key, 'RADIUS'));
    const radius = data?.[0]?.value ? Number(data[0].value) : 10;
    return { message: 'success', radius };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const updateAttendanceRadius = async (radius) => {
  try {
    const value = String(radius);
    // Upsert: update if exists, else insert
    const existing = await db
      .select({ value: configTable.value })
      .from(configTable)
      .where(eq(configTable.key, 'RADIUS'));
    if (existing?.length) {
      await db
        .update(configTable)
        .set({ value })
        .where(eq(configTable.key, 'RADIUS'));
    } else {
      await db.insert(configTable).values({ key: 'RADIUS', value });
    }
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getAttendanceByDate = async (date) => {
  // let date = '2025-03-10';
  try {
    const data = await db
      .select({
        empId: employeeTable.id,
        empName: employeeTable.fullName,
        empPosition: employeeTable.position,
        status: attendanceTable.status,
      })
      .from(attendanceTable)
      .fullJoin(employeeTable, eq(attendanceTable.employeeId, employeeTable.id))
      .where(eq(attendanceTable.attendanceDate, date));
    console.log('attendance: ', data);
    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getSalaryComponents = async () => {
  try {
    const data = await db.select().from(salaryComponentTable).limit(1);
    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const updateSalaryComponents = async (data) => {
  try {
    const updatedData = await db.update(salaryComponentTable).set(data);
    return { message: 'success', updatedData };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getProfessionalTax = async () => {
  try {
    const data = await db.select().from(professionalTaxTable);
    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const updateProfessionalTax = async (data) => {
  try {
    await db.delete(professionalTaxTable);
    const updatedData = await db.insert(professionalTaxTable).values(data);
    return { message: 'success', updatedData };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const postLeaveRequest = async (data) => {
  try {
    await db.insert(leavesTable).values(data);
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getLeavesData = async (id) => {
  try {
    const data = await db
      .select()
      .from(leavesTable)
      .where(eq(leavesTable.employeeId, id))
      .orderBy(desc(leavesTable.date));
    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const updateEmployeeById = async (id, data) => {
  try {
    const allowedKeys = [
      'fullName',
      'gender',
      'maritalStatus',
      'religion',
      'birthDate',
      'mobile',
      'email',
    ];
    const updateData = {};
    for (const key of allowedKeys) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        updateData[key] = data[key];
      }
    }
    if (Object.keys(updateData).length === 0) {
      return { message: 'nothing to update' };
    }
    await db
      .update(employeeTable)
      .set(updateData)
      .where(eq(employeeTable.id, id));
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const getAllLeavesData = async () => {
  try {
    const data = await db
      .select({
        id: leavesTable.id,
        purpose: leavesTable.purpose,
        name: employeeTable.fullName,
        employeeId: leavesTable.employeeId,
        date: leavesTable.date,
        from: leavesTable.from,
        to: leavesTable.to,
        body: leavesTable.body,
        status: leavesTable.status,
      })
      .from(leavesTable)
      .fullJoin(employeeTable, eq(leavesTable.employeeId, employeeTable.id))
      .where(isNotNull(leavesTable.employeeId))
      .orderBy(desc(leavesTable.date));

    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};

export const updateLeaveStatus = async (id, status) => {
  try {
    const updatedData = await db
      .update(leavesTable)
      .set({ status })
      .where(eq(leavesTable.id, id));
    return { message: 'success', updatedData };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};
