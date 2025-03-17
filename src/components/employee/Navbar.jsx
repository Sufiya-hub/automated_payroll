import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-empbg2 rounded-full p-1 flex  border-[1px] border-white">
      <Link
        href="/"
        className="rounded-full px-4 py-2 bg-white/100 cursor-pointer"
      >
        Dashboard
      </Link>
      <Link href="/" className="rounded-full px-4 py-2 cursor-pointer">
        Transactions
      </Link>
    </nav>
  );
};

export default Navbar;
