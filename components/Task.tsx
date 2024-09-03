import Link from "next/link";

import { Button } from "./ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
interface ServiceProps {
  title: string;
  id: string;
  link: string;
  onDelete: (id: string) => void;
}

const Task: React.FC<ServiceProps> = ({ title, id, link, onDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete(id);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between rounded-sm h-[3.5em] bg-backGroundSecondaryColor items-center pl-[1.063em] pr-[0.25em]">
      <div>
        <p className="text-[0.875rem] leading-[1.116rem] text-subTitleColor font-semibold">{title}</p>
      </div>
      <div>
        <Button className="bg-backGroundColor px-[0.85rem] py-[1.5rem] rounded-sm">
          <Link href={`${link}/${id}`}>
            <Image
              src={"/assets/Image/Pancel.svg"}
              alt=""
              width={24}
              height={24}
            />
          </Link>
        </Button>
        <Dialog open={isOpen}>
          <DialogTrigger className="bg-backGroundColor p-[0.75em] rounded-sm ml-[0.25em]">
            <Image
              src={"/assets/Image/trash.svg"}
              alt=""
              width={24}
              height={24}
              onClick={() => setIsOpen(!isOpen)}
            />
          </DialogTrigger>
          <DeleteModal onDelete={handleDelete} />
        </Dialog>
      </div>
    </div>
  );
};

export default Task;

export function DeleteModal({ onDelete }: { onDelete: () => void }) {
  return (
    <DialogContent className="h-[30%] w-[25%]">
      <DialogHeader>
        <DialogTitle className="mx-auto font-bold">Confirmation</DialogTitle>
        <br />
        <hr />
        <DialogDescription className="flex flex-col  gap-3 items-center mt-5 justify-center">
          <p className="text-center mt-5 font-extrabold text-lg text-black">
            Are you sure you want to delete <br />
            this category?
          </p>
          <Button
            className="flex-grow rounded-full bg-deleleColor w-full"
            onClick={onDelete}
          >
            Delete
          </Button>
          <DialogClose>
            <Button className="bg-white text-red-600">Cancel</Button>
          </DialogClose>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
