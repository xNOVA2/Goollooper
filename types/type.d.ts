import {z} from 'zod'

export interface AuthModule {
    title: string;
    subText: string;
    children: React.ReactNode;
    additionalText?: string;
}


 interface SiginFields {
email:string,
password:string
}

export type SigninFields = z.infer<typeof SignInSchema>


 interface ForgetFields{
    email:string
}

export type ForgetFields = z.infer<typeof ForgetSchema>

interface ResetPassword {
    password:string,
    confirmPassword:string
}

export type ResetPassword = z.infer<typeof ResetPasswordSchema>


export interface User {
    fullName: string;
    emailAddress: string;
    premium?: string;
    Tasker?:string
    phoneNumber: string;
    gender: string;
    userSince: string; 
    status: string;

  }
  enum YesNo {
    Yes = 'YES',
    No = 'NO',
  }
 export interface UsersProps {
    users: User[];
    isSubAdmin?:boolean
  }