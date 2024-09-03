"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../ui/input";
import Tooltip from "../Tooltip/ToolTip";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPassword as ResetPasswordType } from "@/types/type";
import { ResetPasswordSchema } from "@/validation/AuthValidation/auth";
import { changePassword } from "@/api";

export default function ChangePassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    try {
      setLoading(true);
      let passRes: any = await changePassword(data);
      if (passRes?.data?.code === 200) {
        toast.success(passRes?.data?.msg);
        setLoading(false);
        router.back();
      } else {
        toast.warning(passRes?.msg);
      }
    } catch (error: Error | any) {
      setLoading(false);
      toast.error(error?.response?.data?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <p className="absolute text-[0.875rem] leading-[1.098rem] text-PrimaryColor pt-[0.688em] pl-[1.313em]">
          New Password*
        </p>
        <div className="flex">
          <Input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className="rounded-lg bg-backGroundColor text-[0.875rem] leading-[1.313rem] pt-[2.188em] pl-[1.313em] text-gray-400 h-[4.125em] focus-visible:outline-none focus-visible:ring-0"
          />
          <div className="absolute ">
            {errors.password?.message && (
              <Tooltip message={errors.password?.message as string} />
            )}
          </div>
        </div>
      </div>
      <div className="relative mt-[0.75em]">
        <p className="absolute text-[0.875rem] leading-[1.098rem] text-PrimaryColor pt-[0.688em] pl-[1.313em]">
          Confirm Password*
        </p>
        <div className="flex">
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="rounded-lg bg-backGroundColor text-[0.875rem] leading-[1.313rem] pt-[2.188em] pl-[1.313em] text-gray-400 h-[4.125em] focus-visible:outline-none focus-visible:ring-0"
          />
          <div className="absolute">
            {errors.confirmPassword?.message && (
              <Tooltip message={errors.confirmPassword?.message} />
            )}
          </div>
        </div>
      </div>

      <Button
        className="w-full h-[4.125rem] text-[1.125rem] rounded-full bg-SecondaryColor"
        type="submit"
      >
        Set Password
      </Button>
    </form>
  );
}
