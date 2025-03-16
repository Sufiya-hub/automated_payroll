import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import PayrollTable from '@/components/PayrollTable';

const page = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-xl p-4 flex flex-col gap-4 h-full overflow-hidden">
        <PayrollTable />
      </div>
    </AdminLayout>
  );
};

export default page;
