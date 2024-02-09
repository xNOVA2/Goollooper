"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import withAuth from "@/components/WithAuth/withAuth";
import DashboardLayout from "../layouts/DashboardLayout";

import UserIcon from "@/public/assets/Image/IconPNG.png";
import TaskIcon from "@/public/assets/Image/Task.svg";
import { dummyUsers } from "@/types/data";
import { User } from "@/types/type";
import { getStats, getUsers } from "@/api";

function Page() {
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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      let statsRes = await getStats();
      let usersRes = await getUsers(page, pageData.limit);

      if (statsRes?.data?.code === 200) {
        setUserCount(statsRes?.data?.data?.userCount);
        setTaskCount(statsRes?.data?.data?.taskCount);
      }
      console.log(usersRes?.data?.data?.pagination);

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
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout Active={1}>
      <div className="flex flex-col gap-4">
        <div className="m-2 border-1 bg-white w-full h-[300px] rounded p-5">
          <h1 className="font-bold text-4xl">Dashboard</h1>
          <p className="text-subTitleColor mt-4">
            You can see the statistics of Goollooper here
          </p>
          <hr className="mt-7" />

          <section className="flex items-center mt-10 justify-start gap-60">
            <div className="flex flex-col items-start space-y-1">
              <Image src={UserIcon} alt="Users Icon" width={40} height={50} />
              <h1 className="text-lg font-extrabold pt-2">{userCount}</h1>
              <p className="text-sm font-bold text-subTitleColor">
                Total Users
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1 ml-4">
              <Image src={TaskIcon} alt="Users Icon" width={40} height={50} />
              <h1 className="text-lg font-extrabold pt-2">{taskCount}</h1>
              <p className="text-sm font-bold text-subTitleColor">
                Total Task Created
              </p>
            </div>
          </section>
        </div>

        <div className="m-2  border-1 bg-white w-full rounded p-5 ">
          <div className="">
            <h1 className="font-bold text-4xl">Recent Users Signed Up</h1>
            <p className="text-subTitleColor mt-5">
              You can see the recent signed up users here
            </p>

            <div className="mt-2 flex flex-col items-stretch space-y-14 w-full">
              {users?.length ? (
                <>
                  <Users users={users} />
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

export default withAuth(Page);
