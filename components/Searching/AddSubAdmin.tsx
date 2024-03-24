"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { onAddSubAdmin } from "@/api";
import { calculateAge } from "@/lib/utils";
import GooglePlacesAutocompleteWrapper from "../PlacesAutoComplete";

export default function AddSubAdmin({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [location, setLocation] = useState<any>("");

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
      <div className="flex justify-between">
        <div className="pt-5">
          <h1 className="font-bold text-3xl mb-7">Personal Data</h1>
          <label htmlFor="" className="font-bold ">
            First Name*
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Last Name
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Date of birth
          </label>
          <Input
            type="date"
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Location{" "}
          </label>
          {/* <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /> */}
          <GooglePlacesAutocompleteWrapper onSelect={setLocation} />
        </div>
        {/* // Account Information */}
        <div className="p-5">
          <h1 className="font-bold text-3xl mb-7">Account Information</h1>
          <label htmlFor="" className="font-bold ">
            Email Address*
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Phone Number
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="" className="font-bold ">
            Password*
          </label>
          <Input
            placeholder="Type here"
            className="bg-backGroundColor border-0 w-[350px] mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
