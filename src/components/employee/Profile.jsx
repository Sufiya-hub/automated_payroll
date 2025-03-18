import React from 'react';
import Image from 'next/image';

const Profile = ({ imageName, position, empName }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        // src={`/employees/Kalyanupdown 1.png`}
        src={`/employees/${imageName}`}
        alt=""
        height={200}
        width={200}
        className="rounded-full max-h-[200px] max-w-[200px]"
      />
      {/* <h1 className="text-3xl text-ehighlight font-medium">KALYAN PENDEM</h1> */}
      <h1 className="text-3xl text-ehighlight font-medium capitalize">
        {empName}
      </h1>
      <h1 className="bg-eprimary text-ehighlight px-2 py-1 font-bold capitalize rounded-full text-sm -mt-2">
        {position}
      </h1>
      {/* <h1 className="bg-eprimary text-ehighlight px-2 py-1 font-medium rounded-full text-sm -mt-2">
        Software Developer
      </h1> */}
    </div>
  );
};

export default Profile;
