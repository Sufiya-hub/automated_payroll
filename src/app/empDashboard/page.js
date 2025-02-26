'use client';
import React, { useState } from 'react';
import Header1 from '@/components/employee/Header1';
import EmpPhoto from '@/components/employee/EmpPhoto';
import Attendance from '@/components/employee/Attendance';

const page = () => {
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  return (
    <div className="relative flex flex-col p-4 bg-background w-full h-[100vh]">
      <div className="flex flex-col p-4 bg-[#ceeff5] h-full rounded-xl gap-4">
        <Header1 setAttendanceDialog={setAttendanceDialog} />
        <EmpPhoto />
        <Attendance
          attendanceDialog={attendanceDialog}
          setAttendanceDialog={setAttendanceDialog}
        />
      </div>
    </div>
  );
};

export default page;
