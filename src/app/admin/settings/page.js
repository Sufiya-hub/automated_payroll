import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import SalaryComponent from '@/components/admin/SalaryComponent';
import ProfessionalTax from '@/components/admin/ProfessionalTax';

const page = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-xl h-full overflow-scroll p-8 flex flex-col gap-4">
        <h1 className="text-xl font-medium">Settings</h1>
        <SalaryComponent />
        <ProfessionalTax />
      </div>
    </AdminLayout>
  );
};

export default page;
