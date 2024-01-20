import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";

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

const dummyUsers = [
  {
    FullName: "John Doe",
    emailAddress: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    gender: "Male",
    userSince: "2022-01-01",
    Status: "Active",
  },
  {
    FullName: "Jane Smith",
    emailAddress: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    gender: "Female",
    userSince: "2022-02-15",
    Status: "Inactive",
  },
  {
    FullName: "Bob Johnson",
    emailAddress: "bob.johnson@example.com",
    phoneNumber: "555-123-4567",
    gender: "Male",
    userSince: "2022-03-10",
    Status: "Active",
  },
];


export function Users() {
  return (
    <Table className="border-collapse ">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          {TableHeaderr.map((item) => (
            <React.Fragment key={item.FullName}>
              <TableHead className="w-64">{item.FullName}</TableHead>
              <TableHead className="w-64">{item.emailAddress}</TableHead>
              <TableHead className="w-64">{item.phoneNumber}</TableHead>
              <TableHead className="w-64">{item.gender}</TableHead>
              <TableHead className="w-64">{item.userSince}</TableHead>
              <TableHead className="w-64">{item.Status}</TableHead>
            </React.Fragment>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyUsers.map((user) => (
          <TableRow key={user.FullName}>
            <TableCell className=" flex items-center gap-3">
              <Image src={"/assets/Image/userPhoto.png"} alt="User-Profile-Pic" width={30} height={30} className="rounded-full" />
              {user.FullName}
            </TableCell>

            <TableCell className="font-medium">{user.emailAddress}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>{user.userSince}</TableCell>
            <TableCell>{user.Status}</TableCell>
            <TableCell>|</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
