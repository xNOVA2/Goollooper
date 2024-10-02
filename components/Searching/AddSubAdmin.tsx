"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { onAddSubAdmin } from "@/api";
import { calculateAge } from "@/lib/utils";
import GooglePlacesAutocompleteWrapper from "../PlacesAutoComplete";
import { RadioGroup, RadioItem } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function AddSubAdmin({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [location, setLocation] = useState<any>("");
  const [selectRole, setSelectRole] = useState<number>(0);


  const onSubmit = async () => {
    if (!firstName || !email || !password) {
      toast.warning("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      let data = {
        firstName,
        lastName,
        email,
        password,
        phone: phone || null,
        age: calculateAge(dob) || null,
        location,
        role: selectRole,
      };
      if (location) {
        data = {
          ...data,
          location: [
            {
              coordinates: [
                location?.latLng?.lat?.toString(),
                location?.latLng?.lng.toString(),
              ],
              state: location?.state,
              city: location?.city,
              country: location?.country,
              readableLocation: location?.label,
              isSelected: "true",
            },
          ],
        };
      } else {
        delete data.location;
      }

      console.log(data);

      let addSubadminRes: any = await onAddSubAdmin(data);
      if (addSubadminRes?.data?.status) {
        toast.success(addSubadminRes?.data?.msg);
        onClose();
        setLoading(false);
      } else {
        toast.warning(addSubadminRes?.msg);
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
    <>
      <div className="w-full flex flex-row gap-[1.125em]">
        <div className="mt-[1.5em]">
          <h1 className="font-semibold text-2xl mb-7">Personal Data</h1>
          <label htmlFor="" className="font-semibold ">
            First Name <span className="text-PrimaryColor">*</span>
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Last Name <span className="text-PrimaryColor">*</span>
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Date of birth <span className="text-PrimaryColor">*</span>
          </label>
          <Input
            type="date"
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Location{" "}
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* // Account Information */}
        <div className="mt-[1.5em]">
          <h1 className="font-semibold text-2xl mb-7">Account Information</h1>
          <label htmlFor="" className="font-semibold ">
            Email Address <span className="text-PrimaryColor">*</span>
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Phone Number <span className="text-PrimaryColor">*</span>
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Temporary Password <span className="text-PrimaryColor">*</span>
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Role <span className="text-PrimaryColor">*</span>
          </label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="w-[1.063em] h-[1.063em] rounded-md border-black data-[state=checked]:border-PrimaryColor data-[state=checked]:bg-PrimaryColor"
                checked={selectRole === 4}
                onCheckedChange={() => setSelectRole(4)}
              />
              <Label htmlFor="terms">Admin</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="w-[1.063em] h-[1.063em] rounded-md border-black data-[state=checked]:border-PrimaryColor data-[state=checked]:bg-PrimaryColor"
                checked={selectRole === 5}
                onCheckedChange={() => setSelectRole(5)}
              />
              <Label htmlFor="terms">Support</Label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center mt-2 ">
        <Button
          className="w-full rounded-full bg-PrimaryColor"
          onClick={onSubmit}
        >
          Add
        </Button>
        <Button className="text-red-600 bg-white" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </>
  );
}
