"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";
import Editor from "@/components/Editor/Editor";
import PushInfomation from "@/components/Pushinfomation/Push";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";

import { getNotification, getUsers, sendNotification } from "@/api";
import { User } from "@/types/type";

interface Option {
  value: string;
  label: string;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [search, setSearch] = useState<string>("");
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState<string>("all");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [users, setUsers] = useState<Option[] | null>(null);

  useEffect(() => {
    fetchNotificationData();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const fetchData = async () => {
    try {
      setUserLoading(true);
      let usersRes = await getUsers(1, 10, search);
      const data = usersRes?.data?.data?.data?.map((item: User) => ({
        value: item.email,
        label: item.email,
      }));
      setOptions(data);
      setUserLoading(false);
    } catch (error: Error | any) {
      setUserLoading(false);
    }
  };

  const fetchNotificationData = async () => {
    try {
      let notificationsRes = await getNotification(1, 10);
      setNotifications(notificationsRes?.data?.data?.result);
    } catch (error: Error | any) {}
  };

  const onPush = async () => {
    if (!title || !content) {
      toast.warning("Please fill all required fields");
      return;
    }
    if (selectedCheckbox === "selected" && !users?.length) {
      toast.warning("Please select users");
      return;
    }
    try {
      setLoading(true);
      let data = {
        title,
        content,
        all: selectedCheckbox === "all",
        receiver: users?.map((item) => item.value) || [],
      };

      let notificationRes: any = await sendNotification(data);
      if (notificationRes?.data?.status) {
        toast.success("Notificaion sent successfully");
        setLoading(false);
      } else {
        toast.warning(notificationRes?.msg);
      }
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
    <DashboardLayout Active={6}>
      <div className="flex">
        <div className="mt-6 w-full ml-6 rounded-lg   flex-col">
          <div className="bg-white  pb-6 rounded-md">
            <div className="  p-7 flex justify-between ">
              <h1 className="text-4xl font-bold">Push Notification</h1>

              <DatePicker />
            </div>

            <PushInfomation
              selectedCheckbox={selectedCheckbox}
              setSelectedCheckbox={setSelectedCheckbox}
              options={options}
              setSearch={setSearch}
              loading={loading}
              userLoading={userLoading}
              handleChange={setUsers}
              title={title}
              setTitle={setTitle}
            />
          </div>

          <div className="p-5 mt-6 bg-white">
            <Editor value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end mt-10">
            <Button
              className="bg-PrimaryColor rounded-full px-11"
              onClick={onPush}
            >
              Push Now
            </Button>
          </div>
        </div>

        <div className="w-2/5 h-screen mt-5 bg-white ml-5 p-10">
          <p className="mb-5 text-lg font-semibold">History</p>
          <div className="flex flex-col space-y-4 border-l-2 border-dashed p-3">
            {notifications?.map((item: any) => (
              <div className="flex items-center gap-4 px-3" key={item._id}>
                <p className="text-xs ">
                  {new Date(item?.createdAt)?.toLocaleDateString()}
                </p>
                <p className="text-xs text-subTitleSecondaryColor">
                  Notification was sent
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
