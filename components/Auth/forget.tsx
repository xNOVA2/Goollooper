'use client'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgetSchema } from '@/validation/AuthValidation/auth';
import { ForgetFields } from '@/types/type';
import Tooltip from '../Tooltip/ToolTip';

export default function ForgetPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ForgetFields>({ resolver: zodResolver(ForgetSchema) });

  const onSubmit: SubmitHandler<ForgetFields> = async (data) => {
    // Handle form submission
    console.log(data);
    window.location.href = "/forget/resetPassword";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mt-3">
        <p className="absolute text-xm text-PrimaryColor px-3 mt-2">Email Address*</p>
        <div className="flex">
          <Input
            {...register("email")}
            type="email" 
            placeholder="example@mail.com"
            className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
          />
          <div className="absolute">
            {errors.email?.message && <Tooltip message={errors.email?.message} />}
          </div>
        </div>
      </div>
      <Button className="w-full rounded-full bg-SecondaryColor py-8 mt-5" type="submit">
        Send Email
      </Button>
    </form>
  );
}