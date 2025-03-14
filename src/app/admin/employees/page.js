'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import EmployeeCard from '@/components/EmployeeCard';
import axios from 'axios';

const page = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get('/api/employees').then((res) => {
      console.log(res);
      if (res?.data?.message === 'success') setData(res.data.data);
    });
  }, []);
  return (
    <AdminLayout>
      <div className="grid md:grid-cols-3 gap-8 w-full h-screen p-4 overflow-scroll">
        {data && data.map((item, index) => <EmployeeCard key={index} emp={...item} />)}
      </div>
    </AdminLayout>
  );
};

export default page;
