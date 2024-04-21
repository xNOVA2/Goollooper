"use client";
import React, { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import Search from "@/components/Searching/Search";

import { getSubadmin } from "@/api";
import { User } from "@/types/type";

export default function SubadminPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [subadmin, setSubadmin] = useState<User[]>([]);
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
      let subadminRes = await getSubadmin(page, pageData.limit, search);
      setSubadmin(subadminRes?.data?.data?.data);
      setPageData({
        ...pageData,
        totalPages: subadminRes?.data?.data?.pagination?.totalPages,
        totalItems: subadminRes?.data?.data?.pagination?.totalItems,
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
    <DashboardLayout Active={3}>
      <div
        className="flex-grow flex flex-col m-2 border-1 bg-white rounded p-5"
        onFocus={() => fetchData(currentPage)}
      >
        <div>
          <h1 className="font-bold text-4xl">Sub Admins</h1>
          <p className="text-subTitleColor mt-5">
            You can see the overall Sub Admins of Goollooper here
          </p>
          <Search isSubAdmin={true} value={search} onChange={setSearch} />
          <div className="flex flex-col items-stretch space-y-14 flex-grow overflow-auto">
            {/* Adding overflow-auto to handle the content overflow */}
            {/* <Users users={dummyUsers2}  isSubAdmin={true}/> */}
            {subadmin?.length ? (
              <Users users={subadmin} isSubAdmin={true} />
            ) : null}
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
