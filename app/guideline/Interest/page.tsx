"use client";
import React, { useCallback, useEffect, useState } from "react";

import Task from "@/components/Task";
import Pagination from "@/components/User/Pagination/Pagination";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { Service } from "@/types/type";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getAllServices } from "@/store/Slices/PaymentSlice";

export default function InterestPage() {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.payment.services);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageData, setPageData] = useState({
    totalPages: 0,
    totalItems: 0,
    limit: 10,
  });

  const fetchData = useCallback(async (page: number) => {
    try {
      setLoading(true);
      await dispatch(getAllServices({ page, limit: pageData.limit, type: "interest" })).unwrap();
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, pageData.limit]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onDeleteCategory = async (id: string) => {
    try {
      await dispatch(deleteService(id)).unwrap();
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  }

  console.log(services);
  return (
    <DashboardLayout>
      <GuidelineLayout>
        <div className="bg-white border border-border px-[1.754em] h-full mr-2 rounded-md  ">
          <div className="flex justify-between">
            <h1 className="font-bold text-[1.875rem] leading-[3rem] mt-[1.754rem]">Task Interests (Categories)</h1>
            <button
              className="w-[16.125rem] h-[2.375rem] mt-[1.313rem] text-[0.875rem] leading-[1.25rem] rounded-full bg-PrimaryColor text-white"
            >
              Add
            </button>
          </div>
          <ScrollArea className="flex flex-col h-calc-interest-list-screen mt-[1.188em]">
            {services?.data?.length
              ? services?.data.map((service: Service) => (
                  <Task
                    key={service._id}
                    title={service.title}
                    id={service._id}
                    link={`/guideline/Interest`}
                    onDelete={onDeleteCategory}
                  />
                ))
              : null}
          </ScrollArea>
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
      </GuidelineLayout>
    </DashboardLayout>
  );
}
