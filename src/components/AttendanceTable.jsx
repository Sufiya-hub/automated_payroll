'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { IoDocumentTextSharp } from 'react-icons/io5';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { employeeTable } from '@/server/db/schemas';
import { PAYMENTS_DATA } from '@/constants/payments';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// const data = PAYMENTS_DATA;

const statusStyle = (status, element) => {
  if (status)
    return element === 'indicator' ? 'bg-green-500' : 'text-green-500';
  else return element === 'indicator' ? 'bg-orange-500' : 'text-orange-500';
};

export function AttendanceTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState();
  const [date, setDate] = React.useState();

  useEffect(() => {
    const getData = async () => {
      await fetch('/api/attendance/byDate', {
        method: 'POST',
        body: JSON.stringify({ date: format(new Date(date), 'yyyy-MM-dd') }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.message === 'success') {
            setData(res.data);
          }
        });
    };
    if (date) getData();
  }, [date]);

  const columns = [
    {
      accessorKey: 'empId',
      header: () => <div className="text-center">Employee Id</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('empId')}</div>
      ),
    },
    // {
    //   accessorKey: 'email',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Email
    //         <ArrowUpDown />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="lowercase">{row.getValue('email')}</div>
    //   ),
    // },
    {
      accessorKey: 'empName',
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Employee Name
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('empName')}</div>
      ),
    },
    {
      accessorKey: 'empPosition',
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Position
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        // <div className="flex justify-center">
        <div className="capitalize text-center">
          {row.getValue('empPosition')}
        </div>
        // </div>
      ),
    },
    // {
    //   accessorKey: 'department',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Department
    //         <ArrowUpDown />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue('department')}
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <div className="">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Status
              <ArrowUpDown />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div
          className={`capitalize p-1 flex rounded-[5px] pl-2 items-center gap-3  ${statusStyle(
            row.getValue('status'),
            'parent'
          )}`}
        >
          <div
            className={`h-[7px] w-[7px] rounded-full ${statusStyle(
              row.getValue('status'),
              'indicator'
            )}`}
          ></div>
          {row.getValue('status') ? 'Present' : 'Leave'}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(employee.empId)}
              >
                Copy Id
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/admin/employees/${employee.empId}`}>
                  View Employee
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    rowCount: 5,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <>
      {data && (
        <div className="w-full h-full px-4 shadow-xl rounded-lg">
          <div className="flex items-end justify-between py-4">
            <div className="flex flex-col gap-2">
              <h1 className="flex gap-2 items-center font-medium text-sm">
                <IoDocumentTextSharp size={15} className="text-blue-700" />
                Attendance History
              </h1>
              <Input
                placeholder="Search Employee..."
                value={table.getColumn('empName')?.getFilterValue() ?? ''}
                onChange={(event) =>
                  table.getColumn('empName')?.setFilterValue(event.target.value)
                }
                className="max-w-sm outline-none focus:border-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={`w-[240px] justify-start text-left font-normal
                      ${!date && 'text-muted-foreground'}`}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, 'yyyy-MM-dd')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                className=""
                size="sm"
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }));
                }}
                // onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => table.nextPage()}
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }));
                }}
                disabled={table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AttendanceTable;
