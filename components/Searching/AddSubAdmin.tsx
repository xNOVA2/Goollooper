"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { onAddSubAdmin } from "@/api";
import { calculateAge } from "@/lib/utils";
import GooglePlacesAutocompleteWrapper from "../PlacesAutoComplete";
import { RadioGroup, RadioItem } from "@radix-ui/react-dropdown-menu";

export default function AddSubAdmin({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [location, setLocation] = useState<any>("");

  const [selectedCheckbox, setSelectedCheckbox] = useState('bordered-checkbox-2');

  const handleCheckboxChange = (event: any) => {
    setSelectedCheckbox(event.target.id);
  };

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
      }

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
            First Name
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Last Name
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Date of birth
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
            Email Address
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Phone Number
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Password
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor w-[26em] h-[2.625em] mt-[0.438em] text-[0.875rem] leading-[1.313rem]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-semibold ">
            Role
          </label>
          <div className="mt-2">
            <div className="flex items-center gap-2 py-1">
              <input
                id="admin"
                type="checkbox"
                value=""
                name="checkbox-admin"
                className="w-4 h-4 outline-none hover:cursor-pointer"
                checked={selectedCheckbox === 'admin'}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="admin"
                className="w-full text-sm font-semibold text-gray-900"
              >
                Admin
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="support"
                type="checkbox"
                value=""
                name="checkbox-support"
                className="w-4 h-4 outline-none hover:cursor-pointer"
                checked={selectedCheckbox === 'support'}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="support"
                className="w-full text-sm font-semibold text-gray-900"
              >
                Support
              </label>
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
