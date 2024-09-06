"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Tooltip from "../Tooltip/ToolTip";
import { zodResolver } from "@hookform/resolvers/zod";

import { ForgetSchema } from "@/validation/AuthValidation/auth";
import { ForgetFields } from "@/types/type";
import { forgetPassword } from "@/api";

export default function ForgetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetFields>({ resolver: zodResolver(ForgetSchema) });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ForgetFields> = async (data) => {
    try {
      setLoading(true);
      let passResRes: any = await forgetPassword(data);
      if (passResRes?.data?.code === 200) {
        toast.success(passResRes?.data?.msg);
        setLoading(false);
        router.push(
          "/forget/resetPassword?token=" + passResRes?.data?.refreshToken
        );
      } else {
        toast.warning(passResRes?.msg);
      }
    } catch (error: Error | any) {
      setLoading(false);
      toast.error(error?.response?.data?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mt-3">
        <p className="absolute text-[0.875rem] leading-[1.098rem] text-PrimaryColor pt-[0.688em] pl-[1.313em]">
          Email Address*
        </p>
        <div className="flex">
          <Input
            {...register("email")}
            type="email"
            placeholder="example@mail.com"
            className="rounded-lg bg-backGroundColor text-[0.875rem] leading-[1.313rem] pt-[2.188em] pl-[1.313em] text-gray-400 h-[4.125em] focus-visible:outline-none focus-visible:ring-0"
          />
          <div className="absolute">
            {errors.email?.message && (
              <Tooltip message={errors.email?.message} />
            )}
          </div>
        </div>
      </div>
      <Button
        className="w-full h-[4.125rem] text-[1.125rem] mt-[1.688rem] mb-[0.75rem] rounded-full bg-SecondaryColor"
        type="submit"
      >
        Send Email
      </Button>
    </form>
  );
}
