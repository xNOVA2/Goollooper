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
interface TaskProps {
    task: string;
  }
  
  const Task: React.FC<TaskProps> = ({ task }) => {
    return (
      <div className="flex justify-between bg-backGroundSecondaryColor items-center pl-5">
        <div>
          <p className="text-sm text-black font-semibold">{task}</p>
        </div>
        <div>
          <Button className="bg-backGroundColor">
            <Image
              src={"/assets/Image/Pancel.svg"}
              alt=""
              width={13}
              height={20}
            />
          </Button>
          <Dialog>
            <DialogTrigger className="bg-backGroundColor">
              {" "}
              <Image
                src={"/assets/Image/trash.svg"}
                alt=""
                width={13}
                height={20}
              />
            </DialogTrigger>
            <DeleteModal />
          </Dialog>
        </div>
      </div>
    );
  };
  
  export default Task; // Add this line to export the Task component

  

export function DeleteModal() {
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
            <Button className="flex-grow rounded-full bg-deleleColor w-full">
              Delete
            </Button>
            <DialogClose>
              <Button className="bg-white text-red-600 "> Cancel</Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  }
  