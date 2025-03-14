import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EmployeeForm from './EmployeeForm';
import DepartmentForm from './DepartmentForm';

export function DropdownMenuDemo() {
  const [employeeForm, setEmployeeForm] = useState(false);
  const [departmentForm, setDepartmentForm] = useState(false);
  return (
    <>
      {employeeForm && <EmployeeForm setEmployeeForm={setEmployeeForm} />}
      {departmentForm && (
        <DepartmentForm setDepartmentForm={setDepartmentForm} />
      )}
      <DropdownMenu className="">
        <DropdownMenuTrigger className="" asChild>
          <Button className=" bg-brand  text-white px-4 rounded-[10px]  shadow-md hover:bg-brand">
            ADD
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="shadow-lg rounded-[5px]">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setEmployeeForm(true)}
            >
              Add Employee
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setDepartmentForm(true)}
            >
              Add Department
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
