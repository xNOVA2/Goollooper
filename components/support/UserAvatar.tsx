import { IMAGE_URL } from "@/lib/constants";
import { Chat } from "@/types/type";
import Image from "next/image";

export const UserAvatar = ({
    name,
    image,
    text,
    chatData,
    chatId,
    onUserClick,
  }: {
    name: string;
    image?: string;
    text: string;
    chatData?: Chat;
    chatId?: string;
    onUserClick?: (chatData: Chat | null) => void;
  }) => {
    // let chatObj: any = null;
    // if (chatData) {
    //   chatObj = chatData;
    //   chatObj.chatId = chatId;
    // }
    return (
      <div
        className="flex items-center gap-2 py-1 hover:bg-backGroundSecondaryColor pl-8 pr-5 hover:cursor-pointer"
        onClick={() => (onUserClick ? onUserClick(chatData || null) : {})}
      >
        <Image
          src={image ? IMAGE_URL + image : "/assets/Image/userPhoto.png"}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    );
  };