'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import EmployeeTable from './admin/EmployeeTable';
import Head from './admin/Head';

const Section1 = ({ setAttendanceDialog }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:3001');
  //   setWs(socket);
  //   return () => socket.close(); // Cleanup WebSocket on unmount
  // }, []);

  // const sendMessage = () => {
  //   if (ws) {
  //     ws.send(JSON.stringify({ role: 'admin', message: 'Task Assigned' }));
  //   }
  // };

  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:3001');

  //   socket.onmessage = (event) => {
  //     setMessages((prev) => [...prev, event.data]);
  //   };

  //   return () => socket.close();
  // }, []);

  const sendMessage = () => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.onopen = () => {
      socket.send('attendace activated');
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
            // onClick={handleAtRequest}
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
