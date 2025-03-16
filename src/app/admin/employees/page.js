'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import EmployeeCard from '@/components/EmployeeCard';
import axios from 'axios';
import { EMP_DATA } from '@/constants/payments';
import { FaSearch } from 'react-icons/fa';

const page = () => {
  const [data, setData] = useState();
  const [originalData, setOriginalData] = useState();
  const [empForm, setEmpForm] = useState(EMP_DATA);
  const [searchOptions, setSearchOptions] = useState({
    empName: '',
    position: '',
  });
  useEffect(() => {
    axios.get('/api/employees').then((res) => {
      // console.log(res);
      if (res?.data?.message === 'success') {
        setOriginalData(res.data.data);
        setData(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    axios.get('/api/employees/status').then((res) => {
      console.log(res);
      // setEmpForm()
      const data = EMP_DATA.map((item) => ({
        ...item,
        count: +res.data.data[0][item.key],
      }));
      console.log('rsults:', data);
      setEmpForm(data);
    });
  }, []);

  const renderStyles = (index) => {
    const bgcolors = [
      'bg-yellow-400',
      'bg-green-400',
      'bg-blue-400',
      'bg-purple-400',
    ];
    return bgcolors[index];
  };

  const positions = [
    {
      label: 'UI/UX Designer',
      value: 'UI/UX designer',
    },
    {
      label: 'Software Developer',
      value: 'software developer',
    },
    {
      label: 'Tester',
      value: 'tester',
    },
    {
      label: 'Marketing',
      value: 'marketing',
    },
    {
      label: 'HR',
      value: 'hr',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredData = originalData;
    if (!originalData) return;

    if (searchOptions.empName !== '') {
      filteredData = filteredData.filter((item) => {
        if (item?.fullName) {
          const dbNames = item.fullName.split(' ');
          const searchNames = searchOptions.empName.split(' ');
          return searchNames.every((val) => dbNames.includes(val));
        }
        return false;
      });
    }
    if (
      searchOptions.position !== '' &&
      searchOptions.position !== 'selectPosition'
    ) {
      filteredData = filteredData.filter(
        (item) => item?.position === searchOptions.position
      );
    }
    setData(filteredData);
  };
  return (
    <AdminLayout>
      <div className="w-full h-screen p-4  overflow-scroll bg-white rounded-xl">
        <h1 className="font-medium text-xl">Employees</h1>
        <div className="grid grid-cols-4 gap-3 mt-10">
          {empForm.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center shadow-lg rounded-lg py-8 px-4 "
            >
              <h1
                className={`${renderStyles(index)} p-2 rounded-full text-white`}
              >
                {item.icon}
              </h1>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm text-brand font-medium">{item.label}</h1>
                <h1 className="text-2xl">{item.count}</h1>
              </div>
            </div>
          ))}
        </div>
        <form className="flex gap-4 mt-10 items-center" onSubmit={handleSearch}>
          <input
            value={searchOptions.empName}
            onChange={(e) =>
              setSearchOptions((prev) => ({ ...prev, empName: e.target.value }))
            }
            type="text"
            placeholder="Employee Name"
            className="border-[1px] outline-none px-4 py-2 rounded-lg focus:border-black transition-all"
          />
          <select
            value={searchOptions.position}
            onChange={(e) =>
              setSearchOptions((prev) => ({
                ...prev,
                position: e.target.value,
              }))
            }
            className="border-[1px] focus:border-black transition-all outline-none px-4 py-2 rounded-lg"
          >
            <option hidden value="selectPosition" className="text-gray-400">
              Employee Position
            </option>
            {positions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-black text-white p-3 rounded-lg ">
            <FaSearch />
          </button>
        </form>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {data &&
            data.map((item, index) => <EmployeeCard key={index} {...item} />)}
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
