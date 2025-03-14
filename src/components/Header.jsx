import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className=" w-full flex justify-between items-center px-8 py-4 bg-background">
      <h1 className="text-3xl font-semibold">
        Effortless<span className="text-brand">Pay</span>
      </h1>
      <Link href={'/login'}>
        <button className="px-4 py-2 rounded-2xl  text-2xl font-medium  hover:text-brand transition-all">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Header;
