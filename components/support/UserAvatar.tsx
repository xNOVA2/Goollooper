import { IMAGE_URL } from "@/lib/constants";
import { Chat } from "@/types/type";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

export const UserAvatar = ({
    name,
    image,
    text,
    chatData,
    chatId,
  isList = false,
  isTicketClosed,
    onUserClick,
  }: {
    name: string;
    image?: string;
    text?: string;
    chatData?: Chat;
    chatId?: string;
    isList: boolean;
    isTicketClosed?: boolean;
    onUserClick?: (chatData: Chat | null) => void;
  }) => {
    return (
      <div
        className={`flex items-center 
          ${isList ? "gap-[0.75em]  py-1 hover:bg-backGroundSecondaryColor pl-8 pr-5 hover:cursor-pointer" :
            "gap-[1.063em]"}`}
        onClick={() => (isList && onUserClick ? onUserClick(chatData || null) : {})}
      >
        <Image
          src={image ? IMAGE_URL + image : "/assets/Image/userPhoto.png"}
          alt="prfilePicture"
          width={isList ? 38 : 48}
          height={isList ? 38 : 48}
          className="rounded-full"
        />
        <div>
          <div className={isList ? "flex flex-col" : "flex flex-row items-center gap-[0.25em]"}>
            <h3 className={isList ? "text-[0.875rem] leading-[1.313rem] font-normal" : "text-[1.125rem] leading-[1.688rem] font-medium"}>
              {isList ? name : `${name} -`}
            </h3>
            <p className={isList ? "text-[0.75rem] leading-[1.125rem] font-normal text-[#1C1C1CA6]" : "text-[1.125rem] leading-[1.688rem] text-[#F48C06] font-medium uppercase"}>
              {isList ? text : chatId?.slice(-12)}
            </p>
          </div>
          {!isList && (
            <div className="flex items-center space-x-2">
              {!isTicketClosed ?
                <Checkbox id="login-checkbox" className="w-[1.063em] h-[1.063em] rounded-md border-border data-[state=checked]:bg-PrimaryColor" />
                :
                <Checkbox id="login-checkbox" checked={isTicketClosed} className="w-[1.063em] h-[1.063em] rounded-md border-border data-[state=checked]:bg-PrimaryColor" />
              }
              <label htmlFor="login-checkbox" className="text-[0.875rem] leading-[1.313rem]">
                Mark as complete
              </label>
            </div>
          )}
        </div>
      </div>
    );
  };