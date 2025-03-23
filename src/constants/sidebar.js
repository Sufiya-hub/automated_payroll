import { IoHome } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoCalendarSharp } from 'react-icons/io5';
import { IoSettings } from 'react-icons/io5';
import { IoMdStats } from 'react-icons/io';
import { FaCcApplePay } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';

export const SIDEBAR = [
  {
    heading: 'EffortLessPay',
    links: [
      {
        label: 'Dashboard',
        icon: <IoHome className="" />,
        link: '/admin/dashboard',
        key: 'dashboard',
      },

      {
        label: 'Payrolls',
        icon: <FaCcApplePay className="" />,
        link: '/admin/payrolls',
        key: 'payrolls',
      },

      {
        label: 'Attendance',
        icon: <IoCalendarSharp className="" />,
        link: '/admin/attendance',
        key: 'attendance',
      },

      {
        label: 'Leave Management',
        icon: <FaCalendar className="" />,
        link: '/admin/leaveManagement',
        key: 'leaveManagement',
      },
      {
        label: 'Employees',
        icon: <MdGroupAdd className="" />,
        link: '/admin/employees',
        key: 'employees',
      },
      {
        label: 'Settings',
        icon: <IoSettings className="" />,
        link: '/admin/settings',
        key: 'settings',
      },
    ],
  },
];
