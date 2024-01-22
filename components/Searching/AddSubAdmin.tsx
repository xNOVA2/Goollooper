import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AddSubAdmin() {
  return (
    <>
      <div className="flex justify-between">
        <div className="pt-5">
          <h1 className="font-bold text-3xl mb-7">Personal Data</h1>
          <label htmlFor="" className="font-bold ">
            First Name
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Last Name
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Date of birth
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Location{" "}
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
        </div>
        {/* // Account Information */}
        <div className="p-5">
          <h1 className="font-bold text-3xl mb-7">Account Information</h1>
          <label htmlFor="" className="font-bold ">
            Email Address
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Phone Number
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Password
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center mt-2 ">
        <Button className="w-full rounded-full bg-PrimaryColor ">Add</Button>
        <Button className="text-red-600 bg-white">Cancel</Button>
      </div>
    </>
  );
}
