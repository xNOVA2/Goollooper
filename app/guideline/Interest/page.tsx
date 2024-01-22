import React from "react";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { Button } from "@/components/ui/button";

import Task from "@/components/Task";

export default function page() {
  return (
    <DashboardLayout>
      <GuidelineLayout>
        <div className="bg-white  h-full mx-4 rounded-md  ">
          <div className="flex gap-2 p-5 justify-between">
            <h1 className="font-bold text-3xl ">Task Interests (Categories)</h1>
            <Button className="w-[30%] rounded-full  bg-PrimaryColor">
              Add
            </Button>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <Task task="Home Improvement" />
            <Task task="Building & Construction" />
          </div>
        </div>
      </GuidelineLayout>
    </DashboardLayout>
  );
}

