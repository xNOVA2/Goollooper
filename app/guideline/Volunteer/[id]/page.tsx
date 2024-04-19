"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addService, deleteService, getService } from "@/api";
import { SubServices } from "@/types/type";

export default function page({ params }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subServices, setSubServices] = useState<SubServices[]>([]);

  useEffect(() => {
    fetchData();
  }, [params?.id]);

  const fetchData = async () => {
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
  };

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
            <div className="bg-white  h-full mx-4 rounded-md  p-5 ">
              <div className=" ">
                <h1 className="font-bold text-3xl">{name}</h1>
              </div>
              <div className="mt-3">
                <Input
                  placeholder="type here"
                  className="py-8 px-10 border-0 bg-backGroundColor"
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

              <div className="min-h-screen">
                <h1 className="font-bold text-4xl mt-5 text-black ">List</h1>
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
          </div>
        </GuidelineLayout>
      </DashboardLayout>
    </>
  );
}

const Category = ({
  id,
  text,
  onClick,
}: {
  id: string;
  text: string;
  onClick: (id: string) => void;
}) => {
  return (
    <div className="relative inline-block px-4 py-3 m-2 shadow-md border-white bg-white border-1 rounded-md">
      <span>{text}</span>
      <svg
        onClick={() => onClick(id)}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 cursor-pointer"
        style={{ right: -10, top: -1 }}
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <circle cx="11" cy="11" r="11" fill="#FF5C5C" />
        <path
          d="M13.9972 13.9133L8.22852 8.14453"
          stroke="#363738"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.9406 8.19824L8.14453 13.9943"
          stroke="#363738"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};
