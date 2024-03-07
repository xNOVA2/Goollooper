import React from "react";
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
import Task from "@/components/Task";

export default function page() {
  return (
    <DashboardLayout>
      <GuidelineLayout>
        <div className="bg-white  h-full mx-4 rounded-md  ">
          <div className="flex gap-2 p-5 justify-between">
            <h1 className="font-bold text-3xl ">Task Interests (Categories)</h1>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-[30%]  rounded-full  bg-PrimaryColor text-white ">
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
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
