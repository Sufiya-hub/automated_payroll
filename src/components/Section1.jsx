'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import EmployeeTable from './admin/EmployeeTable';
import Head from './admin/Head';

const Section1 = ({ setAttendanceDialog }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

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

  const sendMessage = () => {
    // const socket = new WebSocket('ws://localhost:3001');
    console.log('sending message event');
    console.log(process.env.NEXT_PUBLIC_WS_URL);
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    socket.onopen = async () => {
      const res = await getIpAddress();
      // console.log('socket: ', res);
      console.log('socket: ', res);
      if (res?.message === 'success') {
        socket.send(JSON.stringify({ ip: res.ip }));
        await handleAtRequest();
      }

      // setInput('');
    };
  };

  const handleAtRequest = async () => {
    try {
      await fetch('/api/attendance/', {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const session = useSession();
  return (
    <div className="flex flex-col gap-2">
      <div className="border-b-2 p-4 flex justify-between items-center">
        <h1 className="font-medium text-lg">Dashboard</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => sendMessage()}
            className=" bg-brand font-bold text-white px-3 py-2 rounded-lg  shadow-md hover:bg-brand/80 transition-all"
          >
            Generate AT request
          </button>
        </div>
      </div>
      <Head empName={session?.data?.user?.name} />

      <div className="px-4 pb-2">
        <div className="bg-white p-2 border-[1px] border-gray-300 shadow-sm rounded-[15px]">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default Section1;
