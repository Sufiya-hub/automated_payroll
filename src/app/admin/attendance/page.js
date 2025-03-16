import React from 'react';
import AttendanceInfo from '@/components/AttendanceInfo';
import AdminLayout from '@/components/AdminLayout';
import AttendanceTable from '@/components/AttendanceTable';

const page = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-xl p-4 flex flex-col gap-4 h-full overflow-hidden">
        <AttendanceInfo />
        <AttendanceTable />
      </div>
    </AdminLayout>
  );
};

export default page;
