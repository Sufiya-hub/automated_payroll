import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import Section1 from '@/components/Section1';

const page = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-xl h-full overflow-y-scroll">
        <Section1 />
      </div>
    </AdminLayout>
  );
};

export default page;
