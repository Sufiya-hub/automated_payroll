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
    </div>
  );
};

export default SideBar;
