import { z } from "zod";

export interface AuthModule {
  title: string;
  subText: string;
  children: React.ReactNode;
  additionalText?: string;
}

interface SiginFields {
  email: string;
  password: string;
}

export type SigninFields = z.infer<typeof SignInSchema>;

interface ForgetFields {
  email: string;
}

export type ForgetFields = z.infer<typeof ForgetSchema>;

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

enum YesNo {
  Yes = "YES",
  No = "NO",
}
export interface UsersProps {
  users: User[];
  isSubAdmin?: boolean;
}

enum UserLocationType {
  global = "global",
  local = "local",
}

interface Location {
  type: string;
  coordinates: [number, number];
  state?: string;
  city?: string;
  county?: string;
  isSelected: string;
  readableLocation?: string;
}

interface ZipCode {
  code: string;
  isSelected: boolean;
}

interface Schedule {
  startDate: string;
  endDate: string;
  slots: [
    {
      startTime: string;
      endTime: string;
    }
  ];
  repetition: Repetition;
  repeatsAfter: string;
  repeatsEvery: RepetitionEvery;
  repeatsOn: Days;
  occurrence: string;
}

export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password?: string;
  gender?: string;
  age?: number;
  countryCode?: string;
  phoneCode?: string;
  phone?: string;
  completePhone?: string;
  profileImage?: string;
  gallery?: string[];
  galleryImages: string[];
  about?: string;
  role: number;
  volunteer?: string[];
  services?: string[];
  tasks?: string[];
  subscription?: {
    subscription: string;
    plan: string;
  };
  locationType?: UserLocationType;
  location?: Location[];
  selectedLocation?: Location;
  zipCode?: ZipCode[];
  visuals?: string[];
  visualFiles?: string[];
  company?: {
    name?: string;
    logo?: string;
    website?: string;
    affiliation?: string;
    publication?: string;
    resume?: string;
  };
  certificates?: string[];
  certificateFiles?: string[];
  licenses?: string[];
  licenseFiles?: string[];
  reference?: {
    name: string;
    contact: string;
  };
  insurances?: string[];
  insuranceFiles?: string[];
  isProfileCompleted?: boolean;
  isVerified?: boolean;
  isActive: boolean;
  fcmTokens?: string[];
  refreshToken?: string;
  otpCode?: number | null;
  otpExpiredAt?: number | null;
  averageRating: number;
  ratingCount: number;
  isContactPermission?: boolean;
  callToken?: string;
  callDeviceType?: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
