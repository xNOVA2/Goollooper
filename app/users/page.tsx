"use client";
import React, { useEffect, useState } from "react";

import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import Search from "@/components/Searching/Search";
import DashboardLayout from "../layouts/DashboardLayout";

import { getUsers } from "@/api";
import { User } from "@/types/type";

export default function UsersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageData, setPageData] = useState({
    totalPages: 0,
    totalItems: 0,
    limit: 10,
  });

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1);
      fetchData(currentPage);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      let usersRes = await getUsers(page, pageData.limit, search);
      setUsers(usersRes?.data?.data?.data);
      setPageData({
        ...pageData,
        totalPages: usersRes?.data?.data?.pagination?.totalPages,
        totalItems: usersRes?.data?.data?.pagination?.totalItems,
      });
      setLoading(false);
    } catch (error: Error | any) {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout Active={2}>
      <div className="flex-grow flex flex-col m-2 border-1 bg-white rounded p-5">
        <div>
          <h1 className="font-bold text-4xl">Users</h1>
          <p className="text-subTitleColor mt-5">
            You can see the overall Users of Goollooper here
          </p>
          <Search isSubAdmin={false} value={search} onChange={setSearch} />
          <div className="flex flex-col items-stretch space-y-14 flex-grow overflow-auto">
            {/* Adding overflow-auto to handle the content overflow */}
            {users?.length ? <Users users={users} isSubAdmin={false} /> : null}
          </div>
        </div>

        {/* The div you want to stick to the bottom */}
        <div className="p-4 ">
          <Pagination
            currentPage={currentPage}
            totalPages={pageData.totalPages}
            totalItems={pageData.totalItems}
            onPageChange={handlePageChange}
            limit={pageData.limit}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
