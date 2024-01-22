import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import Editor from "@/components/Editor/Editor";
import { PushNotificationData } from "@/types/data";
import { Button } from "@/components/ui/button";
import PushInfomation from "@/components/Pushinfomation/Push";

export default function page() {
  return (
    <DashboardLayout Active={6}>
      <div className="flex">
        <div className="mt-6 w-full ml-6 rounded-lg   flex-col">
          <div className="bg-white  pb-6 rounded-md">
            <div className="  p-7 flex justify-between ">
              <h1 className="text-4xl font-bold">Push Notification</h1>

              <DatePicker />
            </div>

            <PushInfomation     />
          </div>

          <div className="p-5 mt-6 bg-white">
            <Editor value={PushNotificationData} />
          </div>

          <div className="flex justify-end mt-10">
            <Button className="bg-PrimaryColor rounded-full px-11">
              Push Now
            </Button>
          </div>
        </div>

        <div className="w-2/5 h-screen mt-5 bg-white ml-5 p-10">
  <p className="mb-5 text-lg font-semibold">History</p>
  <div className="flex flex-col space-y-4 border-l-2 border-dashed p-3">
    <div className="flex items-center gap-4 px-3">
      <p className="text-xs  ">10/19/2022</p>
      <p className="text-xs text-subTitleSecondaryColor">Notification was sent</p>
    </div>
    <div className="flex items-center gap-4 px-3">
      <p className="text-xs">10/19/2022</p>
      <p className="text-xs text-subTitleSecondaryColor">Notification was sent</p>
    </div>
    <div className="flex items-center gap-4 px-3">
      <p className="text-xs">10/19/2022</p>
      <p className="text-xs text-subTitleSecondaryColor">Notification was sent</p>
    </div>
    <div className="flex items-center gap-4 px-3">
      <p className="text-xs">10/19/2022</p>
      <p className="text-xs text-subTitleSecondaryColor">Notification was sent</p>
    </div>
  </div>
</div>

      </div>
    </DashboardLayout>
  );
}
