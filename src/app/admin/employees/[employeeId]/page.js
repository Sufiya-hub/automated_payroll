'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import EmployeeBankData from '@/components/EmployeeBankData';
import EmployeeCard from '@/components/EmployeeCard';

const page = () => {
  const [model, setModel] = useState(false);
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      axios.get(`/api/employees/${params.employeeId}`).then((res) => {
        console.log(res);
        if (res.data?.message === 'success') {
          setData(res.data.data);
        }
      });
    };
    getData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col">
        <div className='w-full h-[150px] bg-[url("/backgrounds/empBg.jpg")] bg-fill'></div>
        <div className="flex gap-4 md:pl-20">
          <div className="rounded-full bg-white p-1 -translate-y-10 max-h-[110px] max-w-[110px]">
            <Image
              src={`/employees/${data?.image}`}
              width={100}
              height={100}
              alt=""
              className="rounded-full max-h-[100px] max-w-[100px]"
            />
          </div>
          <div className="flex justify-between w-full p-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-medium capitalize">
                {data?.fullName}
              </h1>
              <h1 className="font-bold -mt-1 text-xs text-gray-500 capitalize">
                {data?.position} ( {data?.status} )
              </h1>
              <div className="flex gap-2">
                <div className="flex gap-1  bg-gray-200 text-xs items-center h-fit px-4 py-1 rounded-full">
                  <MdEmail />
                  {data?.email}
                </div>
                <div className="flex gap-1 bg-gray-200 text-xs items-center h-fit px-4 py-1 rounded-full">
                  <FaPhoneAlt /> {data?.mobile}
                </div>
              </div>
            </div>
            <div>
              {model && (
                <EmployeeBankData
                  setModel={setModel}
                  empId={params.employeeId}
                />
              )}
              {data && !data.isFundAccountAdded && (
                <button
                  className="bg-brand rounded-lg px-4 py-2 text-white hover:shadow-lg transition-all"
                  onClick={() => setModel(true)}
                >
                  Add Fund Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
