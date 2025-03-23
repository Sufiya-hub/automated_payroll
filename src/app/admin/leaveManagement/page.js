import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import LeaveManagement from '@/components/admin/LeaveManagement';

const page = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-xl h-full p-4 ">
        <LeaveManagement />
      </div>
    </AdminLayout>
  );
};

export default page;
