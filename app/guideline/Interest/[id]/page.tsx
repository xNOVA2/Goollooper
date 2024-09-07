"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addService, deleteService, getService } from "@/api";
import { SubServices } from "@/types/type";
import { Category } from "@/components/Category";

export default function InterestSubpage({ params }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subServices, setSubServices] = useState<SubServices[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let seervicesRes = await getService(params?.id);
      setLoading(false);
      setName(seervicesRes?.data?.data?.title);
      setSubServices(seervicesRes?.data?.data?.subServices);
    } catch (error: Error | any) {
      setLoading(false);
      console.log(error);
    }
  }, [params?.id]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onAdd = async () => {
    if (!title) return toast.warning("Please enter title");
    try {
      let data = {
        title,
        type: "interest",
        parent: params?.id,
      };
      setLoading(true);
      let addServiceRes: any = await addService(data);
      if (addServiceRes?.data?.status) {
        setLoading(false);
        toast.success(addServiceRes?.data?.msg);
        setSubServices((prev) => [...prev, addServiceRes?.data?.data]);
        setTitle("");
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

  const onDeleteSubCategory = async (id: string) => {
    try {
      setLoading(true);
      let deleteServiceRes: any = await deleteService(id);
      if (deleteServiceRes?.data?.status) {
        setLoading(false);
        toast.success(deleteServiceRes?.data?.msg);
        setSubServices(
          subServices.filter((subService) => subService._id !== id)
        );
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
    <>
      <DashboardLayout>
        <GuidelineLayout>
          <div>
            <div className="bg-white mr-2 rounded-md border border-border px-[1.75em] py-[1.438em]">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-[1.875em] leading-[2.813] font-bold">Interest / Categories</h1>
                <Button className="w-[7.75rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full">Save</Button>
              </div>
              <div>
                <h4 className="text-[0.625rem] leading-[0.938rem] font-normal">Main Category</h4>
                <Input
                  placeholder="type here"
                  className="h-[4.125rem] mt-[1rem] mb-[1.25rem] pl-[2.375rem] pt-[1.313rem] pb-[1.313rem] text-[0.875rem] leading-[1.313rem] shadow-custom bg-white border border-border focus-visible:outline-none focus-visible:ring-0"
                  // value={title}
                  // onChange={(event) => setTitle(event.target.value)}
                />
                <Input
                  placeholder="type here"
                  className="h-[4.125rem] mt-[1rem] mb-[1.25rem] pl-[2.375rem] pt-[1.313rem] pb-[1.313rem] text-[0.875rem] leading-[1.313rem] shadow-custom bg-white border border-border focus-visible:outline-none focus-visible:ring-0"
                  // value={title}
                  // onChange={(event) => setTitle(event.target.value)}
                />
                <div className="flex justify-between">
                  <div></div>
                  <Button className="w-[10.625rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full">Add keywords</Button>
                </div>
                <div className="flex flex-wrap gap-5 mt-6">
                  {subServices?.map((item) => (
                    <Category
                      key={item?._id}
                      id={item?._id}
                      text={item?.title}
                      onClick={onDeleteSubCategory}
                    />
                  ))}
                </div>
              </div>

              <div className=" ">
                <h1 className="font-bold text-3xl">{name}</h1>
              </div>
              <div className="mt-3">
                <Input
                  placeholder="type here"
                  className="h-[4.125rem] mt-[1rem] mb-[1.25rem] pl-[2.375rem] pt-[1.313rem] pb-[1.313rem] text-[0.875rem] leading-[1.313rem] shadow-custom bg-white border border-border focus-visible:outline-none focus-visible:ring-0"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="mt-5 flex justify-end">
                <Button
                  className="px-20 rounded-full bg-PrimaryColor"
                  onClick={onAdd}
                >
                  Add Sub Category
                </Button>
              </div>

              <div className="flex flex-wrap gap-5 mt-6">
                {subServices?.map((item) => (
                  <Category
                    key={item?._id}
                    id={item?._id}
                    text={item?.title}
                    onClick={onDeleteSubCategory}
                  />
                ))}
              </div>

            </div>
          </div>
        </GuidelineLayout>
      </DashboardLayout>
    </>
  );
}

