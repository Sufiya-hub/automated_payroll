import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EmployeeCard = ({ emp }) => {
  return (
    <div className="relative empCardImage flex flex-col gap-4 h-fit w-4/5 p-4 px-10 rounded-lg  shadow-lg items-center justify-center">
      <div className="rounded-full mt-10 z-10 p-1 bg-white">
        <Image
          src={`/employees/${
            emp?.image
              ? emp.image
              : emp.gender === 'female'
              ? 'femalev.png'
              : 'malev.png'
          }`}
          width={100}
          height={100}
          alt=""
          className="shadow-lg rounded-full max-h-[100px] max-w-[100px]"
        />
      </div>
      <div className="flex flex-col w-full gap-1 items-center justify-center">
        <h1 className="font-bold tracking-wide text-lg capitalize">
          {emp?.fullName}
        </h1>
        <h3 className="text-center text-sm capitalize">{emp?.position}</h3>
        <h3
          className={`text-center flex items-center gap-1 text-sm ${
            emp?.status === 'Full-Time'
              ? 'text-green-500'
              : emp?.status === 'Part-Time'
              ? 'text-blue-500'
              : 'text-orange-500'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              emp?.status === 'Full-Time'
                ? 'bg-green-500'
                : emp?.status === 'Part-Time'
                ? 'bg-blue-500'
                : 'bg-orange-500'
            }`}
          ></span>
          {emp?.status}
        </h3>
        <Link
          href={`/admin/employees/${emp.id}`}
          className="p-2 mt-2 bg-brand font-medium text-white rounded-lg"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;
