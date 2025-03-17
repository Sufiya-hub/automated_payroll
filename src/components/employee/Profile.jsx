import React from 'react';
import Image from 'next/image';

const Profile = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={'/employees/Kalyanupdown 1.png'}
        alt=""
        height={300}
        width={300}
      />
      <h1 className="text-3xl text-ehighlight font-medium">KALYAN PENDEM</h1>
      <h1 className="bg-eprimary text-ehighlight px-2 py-1 font-medium rounded-full text-sm -mt-2">
        Software Developer
      </h1>
    </div>
  );
};

export default Profile;
