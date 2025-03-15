'use client';
import React, { useState, useEffect } from 'react';
import Header1 from '@/components/employee/Header1';
import EmpPhoto from '@/components/employee/EmpPhoto';
import Attendance from '@/components/employee/Attendance';
import { useSession } from 'next-auth/react';

const page = () => {
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  const [attendanceBtn, setAttendanceBtn] = useState(false);
  const [messages, setMessages] = useState([]);

  const session = useSession();

  // useEffect(() => {
  //   if (session?.status === 'authenticated');
  // }, [session]);

  const getIpAddress = async () => {
    let ip;
    await fetch('https://api64.ipify.org?format=json')
      .then((res) => res.json())
      .then((res) => {
        ip = res.ip;
      });
    if (typeof ip === 'string') {
      return { message: 'success', ip: ip };
    }
    return { message: 'failure' };
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = async (event) => {
      if (
        session?.status === 'authenticated' &&
        session?.data?.user?.position !== 'hr'
      ) {
        const adminIp = event?.data && JSON.parse(event.data)?.ip;
        console.log('event', adminIp);
        const res = await getIpAddress();
        if (res?.message === 'success' && res.ip === adminIp) {
          setAttendanceBtn(true);
        }
      }
    };

    return () => socket.close();
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
