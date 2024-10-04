import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ServiceInput from "../services/ServiceInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createIndustry } from "@/store/Slices/IndustrySlice";

const IndustryModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);
  const [industry, setIndustry] = useState("");

  const handleAddIndustry = (value: string) => {
    dispatch(createIndustry(value));
    setIndustry("");
  };

  const handleIndustryInput = (value: string) => {
    setIndustry(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-[16.125rem] h-[2.375rem] mt-[1.313rem] text-[0.875rem] leading-[1.25rem] rounded-full bg-PrimaryColor text-white text-center flex items-center justify-center"
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Industry</DialogTitle>
        <DialogDescription>
          <ServiceInput
            title="Industry"
            value={industry}
            onChange={handleIndustryInput}
          />
        </DialogDescription>
        <DialogClose className="flex flex-col gap-2">
          <Button
            className="w-full h-[2.375rem] mt-[1.313rem] text-[0.875rem] leading-[1.25rem] rounded-full bg-PrimaryColor text-white text-center flex items-center justify-center"
            onClick={() => handleAddIndustry(industry)}
          >
            Add Industry
          </Button>
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default IndustryModal;
