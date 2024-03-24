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
        <p className="absolute text-xm text-PrimaryColor px-3 mt-2">
          Email Address*
        </p>
        <div className="flex">
          <Input
            {...register("email")}
            type="email"
            placeholder="example@mail.com"
            className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
          />
          <div className="absolute">
            {errors.email?.message && (
              <Tooltip message={errors.email?.message} />
            )}
          </div>
        </div>
      </div>
      <Button
        className="w-full rounded-full bg-SecondaryColor py-8 mt-5"
        type="submit"
      >
        Send Email
      </Button>
    </form>
  );
}
