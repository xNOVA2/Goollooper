"use client";
import React, { useCallback, useEffect, useState } from "react";

import Task from "@/components/Task";
import Pagination from "@/components/User/Pagination/Pagination";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addService, deleteService, getServices } from "@/api";
import { Service } from "@/types/type";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function InterestPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageData, setPageData] = useState({
    totalPages: 0,
    totalItems: 0,
    limit: 10,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const fetchData = useCallback(async (page: number) => {
    try {
      setLoading(true);
      let seervicesRes = await getServices(page, pageData.limit, "interest");
      setServices(seervicesRes?.data?.data?.data);
      setPageData({
        ...pageData,
        totalPages: seervicesRes?.data?.data?.pagination?.totalPages,
        totalItems: seervicesRes?.data?.data?.pagination?.totalItems,
      });
      setLoading(false);
    } catch (error: Error | any) {
      setLoading(false);
    }
  }, [pageData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const onSubmit = async () => {
    if (!title) return toast.warning("Please enter title");
    try {
      let data = {
        title,
        type: "interest",
      };
      setLoading(true);
      let addServiceRes: any = await addService(data);
      if (addServiceRes?.data?.status) {
        fetchData(currentPage);
        toast.success(addServiceRes?.data?.msg);
        setIsOpen(false);
        setTitle("");
        setLoading(false);
      } else {
        toast.warning(addServiceRes?.msg);
      }
      setLoading(false);
    } catch (error: Error | any) {
      setLoading(false);
      if (typeof error?.response?.data?.data === "object") {
        error?.response?.data?.data?.map((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.msg);
      }
    }
  };

  const onDeleteCategory = async (id: string) => {
    try {
      setLoading(true);
      let deleteServiceRes: any = await deleteService(id);
      if (deleteServiceRes?.data?.status) {
        setLoading(false);
        toast.success(deleteServiceRes?.data?.msg);
        setServices(services.filter((service) => service._id !== id));
      } else {
        toast.warning(deleteServiceRes?.msg);
      }
      setLoading(false);
    } catch (error: Error | any) {
      setLoading(false);
      if (typeof error?.response?.data?.data === "object") {
        error?.response?.data?.data?.map((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.msg);
      }
    }
  };

  return (
    <DashboardLayout>
      <GuidelineLayout>
        <div className="bg-white border border-border px-[1.754em] h-full mr-2 rounded-md  ">
          <div className="flex justify-between">
            <h1 className="font-bold text-[1.875rem] leading-[3rem] mt-[1.754rem]">Task Interests (Categories)</h1>
            <Dialog open={isOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-[16.125rem] h-[2.375rem] mt-[1.313rem] text-[0.875rem] leading-[1.25rem] rounded-full bg-PrimaryColor text-white"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Add
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Interest</DialogTitle>
                  <DialogDescription>
                    You can add Interest from here
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="Title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={onSubmit}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="flex flex-col h-calc-interest-list-screen mt-[1.188em]">
            {services?.length
              ? services.map((service: Service) => (
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
