"use client";
import dynamic from 'next/dynamic';
import Image from "next/image";
import React, { useState } from "react";
import RoleGuard from '@/components/RoleGuard';
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardData from '@/components/DashboardData';
import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import UserIcon from "@/public/assets/Image/IconPNG.png";
import TaskIcon from "@/public/assets/Image/Task.svg";
import { useAuth } from '@/components/WithAuth/withAuth';

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<{ 
    users: any; 
    userCount: number; 
    taskCount: number; 
    pageData: any;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const isAuthenticated = useAuth('/');

  const handleDataLoaded = (data: { users: any; userCount: number; taskCount: number; pageData: any }) => {
    setDashboardData(data);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(dashboardData);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <RoleGuard allowedRoles={[1, 4]}>
    <DashboardLayout Active={1}>
      <DashboardData onDataLoaded={handleDataLoaded} />
      
      {dashboardData && (
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
              <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">{dashboardData.userCount}</h1>
              <p className="text-[0.875rem] leading-[1.313rem] my-3 text-subTitleColor">
                Total Users
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1 ml-4">
              <Image src={TaskIcon} alt="Users Icon" width={42} height={42} />
              <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">{dashboardData.taskCount}</h1>
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
              {dashboardData?.users?.length ? (
                <>
                  <Users users={dashboardData.users} isSubAdmin={false} isPayment={false} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={dashboardData?.pageData?.totalPages}
                    totalItems={dashboardData?.pageData?.totalItems}
                    onPageChange={handlePageChange}
                    limit={dashboardData?.pageData?.limit}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      )}
    </DashboardLayout>
    </RoleGuard>
  );
}

export default dynamic(() => Promise.resolve(DashboardPage), { ssr: false });
