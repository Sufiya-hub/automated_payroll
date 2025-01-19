import { IoHome } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoCalendarSharp } from 'react-icons/io5';
import { IoSettings } from 'react-icons/io5';
import { IoMdStats } from 'react-icons/io';
import { FaCcApplePay } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';

export const SIDEBAR = [
  {
    heading: 'EffortLessPay',
    links: [
      {
        label: 'Dashboard',
        icon: <IoHome className="text-gray-600" />,
        link: '/',
      },
      {
        label: 'Calender',
        icon: <FaCalendarAlt className="text-gray-600" />,
        link: '/',
      },
      {
        label: 'Leave Management',
        icon: <IoCalendarSharp className="text-gray-600" />,
        link: '/',
      },
      {
        label: 'Settings',
        icon: <IoSettings className="text-gray-600" />,
        link: '/',
      },
    ],
  },
  {
    heading: 'Team Management',
    styles: 'text-lg text-gray-400 font-medium -mb-2',
    links: [
      {
        label: 'Performance',
        icon: <IoMdStats className="text-gray-600" />,
        link: '/',
      },
      {
        label: 'Payrolls',
        icon: <FaCcApplePay className="text-gray-600" />,
        link: '/',
      },
      {
        label: 'Invoices',
        icon: <FaFileInvoice className="text-gray-600" />,
        link: '/',
      },
      {
        label: 'Employees',
        icon: <MdGroupAdd className="text-gray-600" />,
        link: '/',
      },
    ],
  },
];
