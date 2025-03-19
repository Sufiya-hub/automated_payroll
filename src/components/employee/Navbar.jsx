import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-empbg2/30 dark:bg-white/10 rounded-full p-1 flex  border-[1px] border-white dark:border-white/30">
      <Link
        href="/"
        className="rounded-full px-4 py-2 bg-white/70 cursor-pointer dark:bg-empdark/80 dark:text-white"
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
