import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className=" w-full flex justify-between items-center px-8 py-4 bg-background">
      <h1 className="text-3xl font-semibold">
        Effortless<span className="text-brand">Pay</span>
      </h1>
      <Link href={'/login'}>
        <button className="bg-white border-[2px] px-4 py-1 rounded-2xl  text-xl font-medium hover:bg-brand hover:text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Header;
