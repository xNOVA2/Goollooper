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

interface SearchProps {
  isSubAdmin: boolean;
  value?: string;
  onChange?: (e: string) => void;
}

export default function Search({ isSubAdmin, value, onChange }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start gap-3 mt-5">
        <button className="flex items-center px-7 bg-backGroundSecondaryColor py-2 gap-2 rounded-lg">
          <Image
            src={"/assets/Image/filter.svg"}
            alt="Filter Icon"
            width={14}
            height={10}
          />
          Filter
        </button>
        <div className="relative">
          <Input
            className=" bg-backGroundSecondaryColor  px-9"
            placeholder="Searching"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
          <Image
            src={"/assets/Image/Search.svg"}
            alt="Filter Icon"
            width={14}
            height={10}
            className="absolute top-3 left-4"
          />
        </div>
      </div>
      <div>
        {!isSubAdmin ? (
          <button className="flex items-center px-7 bg-backGroundSecondaryColor py-2 gap-2 rounded-lg">
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
            <DialogContent className="min-w-[800px] h-[75%]">
              <DialogHeader>
                <DialogTitle>Add Sub Admin</DialogTitle>
                <DialogDescription>
                  This will be reflected to sub admin list and they have <br />
                  the ability to control the admin.
                </DialogDescription>
                <div className="pt-7">
                  <hr />
                </div>
                <div className="">
                  <div>
                    <AddSubAdmin onClose={onToggle} />
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
