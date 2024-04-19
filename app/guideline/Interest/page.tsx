"use client";
import React, { useEffect, useState } from "react";

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

export default function page() {
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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
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
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <div className="bg-white  h-full mx-4 rounded-md  ">
          <div className="flex gap-2 p-5 justify-between">
            <h1 className="font-bold text-3xl ">Task Interests (Categories)</h1>
            <Dialog open={isOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-[30%] rounded-full bg-PrimaryColor text-white"
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
          <div className="flex flex-col gap-4 p-5">
            {services?.length
              ? services.map((service: Service) => (
                  <Task
                    title={service.title}
                    id={service._id}
                    link={`/guideline/Interest`}
                    onDelete={onDeleteCategory}
                  />
                ))
              : null}
          </div>
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
