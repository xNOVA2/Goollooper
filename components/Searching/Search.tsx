import Image from "next/image";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddSubAdmin from "./AddSubAdmin";
import { Filter } from "../Filter/Filter";
import { User } from "@/types/type";
import { downloadCSV } from "@/lib/utils";

interface SearchProps {
  isSubAdmin: boolean;
  value?: string;
  onChange?: (e: string) => void;
  onRoleFilterChange?: (role: number) => void;
  roleFilter?: number | null;
  users: User[];
}

export default function Search({ isSubAdmin, value, onChange, onRoleFilterChange, roleFilter, users }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRoleFilterChange = (role: number | null) => {
    if (onRoleFilterChange && role !== null) {
      onRoleFilterChange(role);
    }
  };

  const handleDownloadCSV = () => {
    downloadCSV(users);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start gap-3 mt-5 mb-3">
        <Filter 
          options={[
            { label: "User", value: 2 },
            { label: "Service Provider", value: 3 }
          ]}
          value={roleFilter ?? null}
          onChange={handleRoleFilterChange}
        />
        <div className="relative outline-none">
          <Input
            className=" bg-backGroundSecondaryColor px-9"
            placeholder="Searching"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
          <Image
            src={"/assets/Image/Search.svg"}
            alt="Filter Icon"
            width={14}
            height={10}
            className="absolute top-3 left-4 outline-none"
          />
        </div>
      </div>
      <div>
        {!isSubAdmin ? (
          <button className="flex items-center px-7 bg-backGroundSecondaryColor py-2 gap-2 rounded-lg"
            onClick={handleDownloadCSV}
          >
            <Image
              src={"/assets/Image/Csv.jpg"}
              alt="Filter Icon"
              width={20}
              height={20}
            />
            Download CSV
          </button>
        ) : (
          <Dialog open={isOpen}>
            <DialogTrigger>
              <button
                className="flex items-center px-7 bg-backGroundSecondaryColor py-2 gap-2 rounded-lg"
                onClick={onToggle}
              >
                <span>+</span>
                Add Sub Admin
              </button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] h-[85%] overflow-x-hidden overflow-y-auto">
              <DialogHeader className="mt-5 border-b border-collapse border-border pb-7">
                <DialogTitle className="text-3xl">Add Sub Admin</DialogTitle>
                <DialogDescription>
                  This will be reflected to sub admin list and they have <br />
                  the ability to control the admin.
                </DialogDescription>
              </DialogHeader>
              <AddSubAdmin onClose={onToggle} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
