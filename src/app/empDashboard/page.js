'use client';
import React, { useState, useEffect } from 'react';
import Header1 from '@/components/employee/Header1';
import Header from '@/components/employee/Header';
import EmpPhoto from '@/components/employee/EmpPhoto';
import Attendance from '@/components/employee/Attendance';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Progress from '@/components/employee/Progress';
import TimeTracker from '@/components/employee/TimeTracker';
import Section from '@/components/employee/Section';

const page = () => {
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  const [attendanceBtn, setAttendanceBtn] = useState(false);
  const [messages, setMessages] = useState([]);

  const session = useSession();

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
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    console.log('session data:', session);

    if (session?.status === 'authenticated') checkActiveNotif();

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

  const checkActiveNotif = async () => {
    try {
      // console.log('sne/');
      await axios('/api/attendance/notif').then((res) => {
        // console.log('ans:', res);
        if (res?.data?.message === 'success' && res?.data?.data?.length !== 0)
          setAttendanceBtn(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => document.documentElement.classList.add('dark'), []);

  return (
    <div className="h-[100vh] z-10 max-h-screen overflow-hidden relative w-full p-4 bg-empbg1 dark:bg-empdark">
      <div className="absolute z-[-1] bg-brand h-[850px] w-[950px] blur-[200px] -right-1/2  -bottom-1/2"></div>
      <div className="absolute z-[-1] bg-brand/60 h-[850px] w-[950px] blur-[200px] -right-0 -top-1/3"></div>
      <div className="absolute z-[-1] bg-brand/80 h-[850px] w-[950px] blur-[200px]  left-0 -bottom-[700px]"></div>

      <div className="z-20">
        <Header1
          attendanceBtn={attendanceBtn}
          setAttendanceDialog={setAttendanceDialog}
          empName={session?.data?.user?.name}
        />
        <Section
          empName={session?.data?.user?.name}
          imageName={session?.data?.user?.image}
          position={session?.data?.user?.position}
        />
      </div>

      {session?.status === 'authenticated' &&
        session?.data?.user.name !== '' && (
          <Attendance
            imageName={session?.data?.user?.image}
            attendanceDialog={attendanceDialog}
            setAttendanceDialog={setAttendanceDialog}
          />
        )}
    </div>
  );
};

export default page;

{
  /* <div className="relative flex flex-col px-4 bg-gradient-to-br from-[#e0f7fb] to-[#ceeff5] w-full h-[100vh]">
      <div className="flex flex-col p-2  h-full rounded-xl gap-4">
        <Header
          empName={session?.data?.user?.name}
          imageName={session?.data?.user?.image}
          position={session?.data?.user?.position}
        />
        <Header1
          attendanceBtn={attendanceBtn}
          setAttendanceDialog={setAttendanceDialog}
          empName={session?.data?.user?.name}
        />
        <div className="grid grid-cols-2  w-full gap-4">
          <EmpPhoto session={session} imageName={session?.data?.user?.image} />
          {session?.data?.user && (
            <Attendance
              imageName={session?.data?.user?.image}
              attendanceDialog={attendanceDialog}
              setAttendanceDialog={setAttendanceDialog}
            />
          )}
          <div className="flex gap-3">
            <Progress />
            <TimeTracker />
          </div>
        </div>
      </div>
    </div> */
}
