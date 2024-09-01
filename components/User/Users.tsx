import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UsersProps } from "@/types/type";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IMAGE_URL } from "@/lib/constants";

const TableHeaderr = [
  {
    FullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    gender: "Gender",
    userSince: "User Since",
    Status: "Status",
  },
];
const TableHeaderrForUsers = [
  {
    FullName: "Full Name",
    emailAddress: "Email Address",
    PremiumUser: "Premium User",
    Tasker: "Tasker",
    phoneNumber: "Phone Number",
    gender: "Gender",
    userSince: "User Since",
    Status: "Status",
  },
];
export function Users({ users, isSubAdmin }: UsersProps) {
  return (
    <Table className="border-collapse"> 
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow className="border-y border-collapse">
          <TableHead>Full Name</TableHead>
          <TableHead>Email Address</TableHead>
          {!isSubAdmin ? (
            <>
              <TableHead>Premium User</TableHead>
              <TableHead>Tasker</TableHead>
            </>
          ) : null}
          <TableHead>Phone Number</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>User Since</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => (
          <TableRow key={user._id}>
            <TableCell className="flex items-center gap-3 cursor-pointer">
              <Dialog>
                <DialogTrigger className="flex items-center gap-2">
                  <Image
                    src={
                      user.profileImage
                        ? IMAGE_URL + user.profileImage
                        : "/assets/Image/userPhoto.png"
                    }
                    alt="User-Profile-Pic"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <p className="text-xs">
                    {user.firstName} {user.lastName}
                  </p>{" "}
                </DialogTrigger>
                {!isSubAdmin ? (
                  <UserModal user={user} />
                ) : (
                  <SubAdminModal user={user} />
                )}
              </Dialog>
            </TableCell>

            <TableCell className="font-medium">{user.email}</TableCell>
            {!isSubAdmin && <TableCell className="">Yes</TableCell>}
            {!isSubAdmin && (
              <TableCell>{user?.role === 3 ? "Yes" : "No"}</TableCell>
            )}
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>
              {new Date(user?.createdAt)?.toLocaleDateString()}
            </TableCell>
            <TableCell
              className={`${
                user.isActive
                  ? "text-green-500 font-bold "
                  : "text-red-500 font-bold"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </TableCell>
            <TableCell>|</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function UserModal({ user }: { user: User }) {
  return (
    <DialogContent className="h-[85%] w-[30%] overflow-auto">
      <DialogHeader>
        <DialogTitle className="mx-auto pb-4">Users Profile</DialogTitle>
        <hr className="" />
        <DialogDescription>
          <div className="flex flex-col justify-between item h-[420px]">
            <div className="flex items-center flex-col mt-10 h-[30%]">
              <Image
                className="rounded-full"
                src={
                  user.profileImage
                    ? IMAGE_URL + user.profileImage
                    : "/assets/Image/userPhoto.png"
                }
                alt="image"
                width={70}
                height={70}
              />
              <h1 className="mt-2 font-bold text-black text-xl">
                {user.firstName} {user.lastName}
              </h1>

              <div className="mt-3 text-center">
                <p>{user?.role === 3 ? "Tasker" : "Not a Tasker"}</p>
              </div>
            </div>
            <div className="mt-24">
              <h1 className="text-black font-bold text-xl">Personal Info</h1>
              <div className="">
                <div className=" p-2 flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">
                    Email Address
                  </h1>
                  {user.email}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Phone number</h1>
                  {user.phone}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Gender</h1>
                  {user.gender}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Age</h1>
                  {user?.age}
                </div>
              </div>
            </div>
            {user?.role === 2 ? (
              <div className="mt-6">
                <h1 className="text-xl font-bold text-black mb-3">Gallery</h1>
                <div className="flex flex-wrap gap-3">
                  {user?.gallery?.map((image: string) => (
                    <Image
                      key={user._id + image}
                      src={IMAGE_URL + image}
                      alt="user Picture"
                      width={150}
                      height={150}
                      className="rounded-2xl"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Visuals validation
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.visuals?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={IMAGE_URL + image}
                        alt="user visuals"
                        width={150}
                        height={150}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Brand Information
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    <Image
                      src={IMAGE_URL + user?.company?.logo}
                      alt="user visuals"
                      width={250}
                      height={250}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Professional Certifications
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.certificates?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={IMAGE_URL + image}
                        alt="user certificate"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Licensing
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.licenses?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={IMAGE_URL + image}
                        alt="user license"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Insurances
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.insurances?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={IMAGE_URL + image}
                        alt="user insurance"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}

function SubAdminModal({ user }: { user: User }) {
  return (
    <DialogContent className=" w-[30%] ">
      <DialogHeader>
        <DialogTitle className="mx-auto">Sub Admin Profile</DialogTitle>
        <hr />
        <DialogDescription>
          <div className="flex flex-col justify-between item h-[340px]">
            <div className="flex items-center flex-col mt-10 h-[30%]">
              <Image
                className="rounded-full"
                src={"/assets/Image/userPhoto.png"}
                alt=" "
                width={70}
                height={70}
              />
              <h1 className="mt-2 font-bold text-black">Lincoln Korsgaard</h1>

              <div className="mt-3 text-center">
                <p className="text-PrimaryColor">
                  {new Date(user?.createdAt)?.toLocaleDateString()}
                </p>
                <p>Sub Admin Since</p>
              </div>
            </div>
            <div>
              <h1 className="text-black font-bold text-xl">Personal Info</h1>
              <div className="">
                <div className=" p-2 flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">
                    Email Address
                  </h1>
                  {user.email}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Phone number</h1>
                  {user.phone}
                </div>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
