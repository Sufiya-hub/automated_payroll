'use client';
import React from 'react';
import { SIDEBAR } from '@/constants/sidebar';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { BiLogOutCircle } from 'react-icons/bi';

const SideBar = () => {
  const path = usePathname();
  console.log();
  return (
    <div className="flex flex-col justify-between gap-8 p-8 w-[35ch] bg-background h-[100vh]">
      <div className="flex flex-col gap-8 ">
        {SIDEBAR.map((object, obkey) => (
          <div key={obkey}>
            <h1 className={`font-semibold text-2xl  text-brand mb-8`}>
              {object.heading}
            </h1>
            <div className="flex flex-col gap-1 font-medium mt-2 text-gray-600">
              {object.links.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className={`
                ${
                  path.split('/')[2] === item.key
                    ? 'group bg-brand text-white'
                    : 'hover:bg-gray-200'
                }
                flex gap-3 items-center cursor-pointer px-4 py-2 rounded-lg transition-all`}
                >
                  <div className={`text-gray-600 group-[.bg-brand]:text-white`}>
                    {item.icon}
                  </div>
                  <h1>{item.label}</h1>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={signOut}
        className=" bg-gray-200 w-full  flex gap-2 items-center font-medium  px-4 py-2 rounded-lg  hover:shadow-md hover:bg-red-500 hover:text-white transition-all self-start"
      >
        <BiLogOutCircle size={20} /> LogOut
      </button>
    </div>
  );
};

export default SideBar;
