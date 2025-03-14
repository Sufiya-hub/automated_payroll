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
    styles: 'mb-12',
    links: [
      {
        label: 'Dashboard',
        icon: <IoHome className="" />,
        link: '/admin/dashboard',
        key: 'dashboard',
      },
      // {
      //   label: 'Calender',
      //   icon: <FaCalendarAlt className="" />,
      //   link: '/',
      // },
      {
        label: 'Attendance',
        icon: <IoCalendarSharp className="" />,
        link: '/admin/attendance',
        key: 'attendance',
      },
      {
        label: 'Settings',
        icon: <IoSettings className="" />,
        link: '/admin/settings',
        key: 'settings',
      },
    ],
  },
  {
    heading: 'Team Management',
    styles: 'text-lg text-gray-400 font-medium ',
    links: [
      {
        label: 'Performance',
        icon: <IoMdStats className="" />,
        link: '/admin/performance',
        key: 'performance',
      },
      {
        label: 'Payrolls',
        icon: <FaCcApplePay className="" />,
        link: '/admin/payrolls',
        key: 'payrolls',
      },
      {
        label: 'Employees',
        icon: <MdGroupAdd className="" />,
        link: '/admin/employees',
        key: 'employees',
      },
    ],
  },
];
