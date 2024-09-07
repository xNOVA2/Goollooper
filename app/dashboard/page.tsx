"use client";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import withAuth from "@/components/WithAuth/withAuth";
import DashboardLayout from "../layouts/DashboardLayout";

import UserIcon from "@/public/assets/Image/IconPNG.png";
import TaskIcon from "@/public/assets/Image/Task.svg";
import { dummyUsers } from "@/types/data";
import { User } from "@/types/type";
import { getStats, getUsers } from "@/api";

function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userCount, setUserCount] = useState<number>(0);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageData, setPageData] = useState({
    totalPages: 0,
    totalItems: 0,
    limit: 5,
  });

  const fetchData = useCallback(async (page: number) => {
    try {
      setLoading(true);
      let statsRes = await getStats();
      let usersRes = await getUsers(page, pageData.limit);

      if (statsRes?.data?.code === 200) {
        setUserCount(statsRes?.data?.data?.userCount);
        setTaskCount(statsRes?.data?.data?.taskCount);
      }

      if (usersRes?.data?.data?.data?.length) {
        setUsers(usersRes?.data?.data?.data);
        setPageData({
          ...pageData,
          totalPages: usersRes?.data?.data?.pagination?.totalPages,
          totalItems: usersRes?.data?.data?.pagination?.totalItems,
        });
      }
    } catch (error: Error | any) {
      setLoading(false);
    }
  }, [pageData]);
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout Active={1}>
      <div className="flex flex-col gap-4">
        <div className="pl-[1.75em] mx-2 mt-3 border border-border bg-white rounded-md">
          <h1 className="font-semibold text-[1.875rem] leading-[2.813rem] mt-[2rem] ">Dashboard</h1>
          <p className="text-[0.875rem] leading-[1.313rem] text-subTitleColor mt-[0.5em]">
            You can see the statistics of Goollooper here
          </p>
          <hr className=" my-[1.688em]" />

          <section className="flex items-center mb-[2em] justify-start gap-[13.313em] ">
            <div className="flex flex-col items-start space-y-1">
              <Image src={UserIcon} alt="Users Icon" width={42} height={42} />
              <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">{userCount}</h1>
              <p className="text-[0.875rem] leading-[1.313rem] my-3 text-subTitleColor">
                Total Users
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1 ml-4">
              <Image src={TaskIcon} alt="Users Icon" width={42} height={42} />
              <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">{taskCount}</h1>
              <p className="text-[0.875rem] leading-[1.313rem] text-subTitleColor">
                Total Task Created
              </p>
            </div>
          </section>
        </div>

        <div className="pl-[1.75em] pr-[1.75em] pb-[1em] mx-2 mb-3 border border-border bg-white rounded-md">
          <div className="">
            <h1 className="font-bold text-[1.875rem] leading-[2.813rem] mt-[1.813rem]">Recent Users Signed Up</h1>
            <p className="text-[0.875rem] leading-[1.313rem] text-subTitleColor mt-[0.5em] mb-[3.938rem]">
              You can see the recent signed up users here
            </p>

            <div className="flex flex-col items-stretch space-y-14 w-full">
              {users?.length ? (
                <>
                  <Users users={users} isSubAdmin={false} isPayment={false} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pageData.totalPages}
                    totalItems={pageData.totalItems}
                    onPageChange={handlePageChange}
                    limit={pageData.limit}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(withAuth(DashboardPage)), { ssr: false });
