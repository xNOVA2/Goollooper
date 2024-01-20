'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { ResetPassword as ResetPasswordType } from '@/types/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '@/validation/AuthValidation/auth';
import { Input } from '../ui/input';
import Tooltip from '../Tooltip/ToolTip';
import { Button } from '../ui/button';

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ResetPasswordType>({ resolver: zodResolver(ResetPasswordSchema) });
    
      const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
        console.log(data);
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="relative">
      <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
        New Password*
      </p>
      <div className="flex">
      <Input
        {...register("password")}
        type="email"
        placeholder="New Password"
        className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
      />
      <div className="absolute ">
      {errors.password?.message && <Tooltip message={errors.password?.message as string}/> }
      </div>
      </div>
  
    </div>
    <div className="relative mt-3">
      <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
      Confirm Password*
      </p>
      <div className="flex">
      <Input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
      />
      <div className="absolute">
      {errors.confirmPassword?.message && <Tooltip message={errors.confirmPassword?.message}/> }

      </div>
      </div>
      
    </div>
    
    <Button
      className="w-full rounded-full bg-SecondaryColor py-8 mt-5"
      type="submit"
    >
      Set Password
    </Button>
  </form>
  )
}
