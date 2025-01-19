'use client';
import React from 'react';
import { SIDEBAR } from '@/constants/sidebar';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const path = usePathname();
  // console.log();
  return (
    <div className="flex flex-col gap-8 p-8 w-[35ch] bg-background h-[100vh]">
      {SIDEBAR.map((object, obkey) => (
        <div key={obkey}>
          <h1
            className={`font-semibold text-2xl text-brand ${
              object.styles || ''
            }`}
          >
            {object.heading}
          </h1>
          <div className="flex flex-col gap-4 font-medium mt-8 pl-4 text-gray-600">
            {object.links.map((item, index) => (
              <div
                key={index}
                className={`
                flex gap-3 items-center cursor-pointer`}
              >
                {item.icon}
                <h1>{item.label}</h1>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <div className="flex flex-col gap-4 font-medium mt-8">
        <h1 className="text-normal  text-gray-400">TEAMMANAGEMENT</h1>
        <div className="flex gap-3 items-center cursor-pointer">
          <IoMdStats className="text-gray-600" size={20} />
          <h1>Performance</h1>
        </div>
        <div className="flex gap-3  items-center cursor-pointer">
          <FaCcApplePay className="text-gray-600" />
          <h1>Payrolls</h1>
        </div>
        <div className="flex gap-3  items-center cursor-pointer">
          <FaFileInvoice className="text-gray-600" />
          <h1>Invoices</h1>
        </div>
        <div className="flex gap-3  items-center cursor-pointer">
          <MdGroupAdd className="text-gray-600" size={20} />
          <h1>Employees</h1>
        </div>
      </div> */}
    </div>
  );
};

export default SideBar;
