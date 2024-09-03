"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { on } from "events";

interface ConfirmationModalProps {
  isAccept?: boolean;
  userID?: string;
  amount?: number;
  onAccept?: (id: any) => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isAccept,
  userID,
  amount,
  onAccept,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccept = () => {
    if (onAccept && userID && isAccept) {
      onAccept(userID);
    }
    if (onAccept && amount && !isAccept) {
        onAccept(amount);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white rounded-full bg-PrimaryColor"
          onClick={() => setIsOpen(true)}
        >
          {!isAccept ? "Withdraw" : "Accept"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[25.25em] h-[17.563em]">
        <div className="border-b border-border pb-[1.063em] pt-[1.313em] flex justify-center">
          <h1 className="text-[1.375rem] leading-[2.063rem] font-semibold">
            Confirmation
          </h1>
        </div>
        <div>
          <DialogDescription className="text-[1.125rem] leading-[1.688rem] font-medium text-black text-center">
            {!isAccept ? "Are you sure you want to withdraw?" : "Are you sure you want to accept this request?"}
          </DialogDescription>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <Button
            className="h-[2.375rem] w-[20.875rem] text-[0.875rem] leading-[1.25rem] bg-PrimaryColor text-white rounded-full"
            onClick={handleAccept}
          >
            {!isAccept ? "Withdraw" : "Accept"}
          </Button>
          <Button
            variant="ghost"
            className="h-[2.375rem] w-[20.875rem] text-[0.875rem] leading-[1.25rem] text-red-500 hover:bg-white hover:text-red"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
