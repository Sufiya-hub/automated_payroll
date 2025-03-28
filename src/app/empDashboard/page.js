'use client';
import React, { useState, useEffect } from 'react';
import Header1 from '@/components/employee/Header1';
import Header from '@/components/employee/Header';
import EmpPhoto from '@/components/employee/EmpPhoto';
import Attendance from '@/components/employee/Attendance';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ApplyLeave from '@/components/employee/ApplyLeave';
import Progress from '@/components/employee/Progress';
import TimeTracker from '@/components/employee/TimeTracker';
import Section from '@/components/employee/Section';

const OFFICE_RADIUS = process.env.NEXT_PUBLIC_Office_Radius;
console.log(OFFICE_RADIUS);

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const toRadians = (deg) => deg * (Math.PI / 180); // Convert degrees to radians

  let dLat = toRadians(lat2 - lat1);
  let dLon = toRadians(lon2 - lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  let a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

const page = () => {
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  const [attendanceBtn, setAttendanceBtn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [applyLeave, setApplyLeave] = useState(false);

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
    // console.log('session data:', session);

    if (session?.status === 'authenticated') checkActiveNotif();

    socket.onmessage = async (event) => {
      console.log('event:', event.data);
      if (
        session?.status === 'authenticated' &&
        session?.data?.user?.position !== 'hr'
      ) {
        const adminIp = event?.data && JSON.parse(event.data)?.ip;
        const adminLatitude =
          event?.data && JSON.parse(event.data)?.adminLatitude;
        const adminLongitude =
          event?.data && JSON.parse(event.data)?.adminLongitude;
        console.log('event', adminIp);
        console.log('event', adminLatitude);
        console.log('event', adminLongitude);
        const res = await getIpAddress();
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const distance = haversine(
            adminLatitude,
            adminLongitude,
            latitude,
            longitude
          );
          // console.log('distance', distance);
          if (
            distance &&
            distance < OFFICE_RADIUS &&
            res?.message === 'success' &&
            res.ip === adminIp
          ) {
            setAttendanceBtn(true);
          }
        });
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
    <div className="h-[100vh]  z-10 max-h-screen overflow-hidden relative w-full p-4 bg-empbg1 dark:bg-empdark">
      <div className="absolute z-[-1] bg-brand h-[850px] w-[950px] blur-[200px] -right-1/2  -bottom-1/2"></div>
      <div className="absolute z-[-1] bg-brand/60 h-[850px] w-[950px] blur-[200px] -right-0 -top-1/3"></div>
      <div className="absolute z-[-1] bg-brand/80 h-[850px] w-[950px] blur-[200px]  left-0 -bottom-[700px]"></div>

      <div className="z-20">
        <Header1
          attendanceBtn={attendanceBtn}
          setAttendanceDialog={setAttendanceDialog}
          empName={session?.data?.user?.name}
          setApplyLeave={setApplyLeave}
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
      {applyLeave && <ApplyLeave setApplyLeave={setApplyLeave} />}
    </div>
  );
};

export default page;
