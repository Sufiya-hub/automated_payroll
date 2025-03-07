'use client';
import React, { useState, useEffect } from 'react';
import Header1 from '@/components/employee/Header1';
import EmpPhoto from '@/components/employee/EmpPhoto';
import Attendance from '@/components/employee/Attendance';
import { useSession } from 'next-auth/react';

const page = () => {
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  const [attendanceBtn, setAttendanceBtn] = useState(false);

  const session = useSession();

  useEffect(() => {
    console.log('session:', session);
    if (session?.status === 'authenticated') setAttendanceBtn(true);
  }, [session]);

  return (
    <div className="relative flex flex-col p-4 bg-gradient-to-br from-[#e0f7fb] to-[#ceeff5] w-full h-[100vh]">
      <div className="flex flex-col p-4  h-full rounded-xl gap-4">
        <Header1
          attendanceBtn={attendanceBtn}
          setAttendanceDialog={setAttendanceDialog}
          empName={session?.data?.user?.name}
        />
        <EmpPhoto session={session} imageName={session?.data?.user?.image} />
        <Attendance
          imageName={session?.data?.user?.image}
          attendanceDialog={attendanceDialog}
          setAttendanceDialog={setAttendanceDialog}
        />
      </div>
    </div>
  );
};

export default page;
