import Link from "next/link";

import { Button } from "./ui/button";
import Image from "next/image";
import { ConfirmationModal } from "./ConfirmationModal";
interface ServiceProps {
  title: string;
  id: string;
  link: string;
  onDelete: (id: string) => void;
}

const Task: React.FC<ServiceProps> = ({ title, id, link, onDelete }) => {

  return (
    <div className="flex justify-between rounded-sm mt-[0.5em] h-[3.5em] bg-backGroundSecondaryColor items-center pl-[1.063em] pr-[0.25em]">
      <div>
        <p className="text-[0.875rem] leading-[1.116rem] text-subTitleColor font-semibold">{title}</p>
      </div>
      <div className="flex gap-[0.3em]">
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
        <ConfirmationModal isDelete={true} taskID={id} onAccept={onDelete} />
      </div>
    </div>
  );
};

export default Task;
