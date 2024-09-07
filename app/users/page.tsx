"use client";
import React, { useCallback, useEffect, useState } from "react";

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

  const fetchData = useCallback(async (page: number, searchTerm: string) => {
    try {
      setLoading(true);
      let usersRes = await getUsers(page, pageData.limit, searchTerm);
      setUsers(usersRes?.data?.data?.data || []);
      setPageData(prevPageData => ({
        ...prevPageData,
        totalPages: usersRes?.data?.data?.pagination?.totalPages || 0,
        totalItems: usersRes?.data?.data?.pagination?.totalItems || 0,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [pageData.limit]);

  console.log(users);

  useEffect(() => {
    fetchData(currentPage, search);
  }, [currentPage, search, fetchData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout Active={2}>
      <div className="flex-grow flex flex-col mt-4 ml-3 border border-border bg-white rounded p-5">
        <div className="mt-3">
          <h1 className="font-bold text-4xl">Users</h1>
          <p className="text-subTitleColor mt-5">
            You can see the overall Users of Goollooper here
          </p>
          <Search isSubAdmin={false} value={search} onChange={handleSearchChange} />
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
