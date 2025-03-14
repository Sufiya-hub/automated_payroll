import React from 'react';
import SideBar from './SideBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex max-h-screen h-screen overflow-hidden">
      <SideBar />
      <div className="w-full bg-background p-2 pb-0 shadow-sm">{children}</div>
    </div>
  );
};

export default AdminLayout;
