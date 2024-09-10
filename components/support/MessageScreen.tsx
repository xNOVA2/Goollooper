import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Message, User } from "@/types/type";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { IMAGE_URL } from "@/lib/constants";
import { AlertCircle } from "lucide-react";

const groupMessagesByTime = (messages: Message[]): [string, Message[]][] => {
  const groups: { [key: string]: Message[] } = {};
  
  messages.forEach((message) => {
    if (message.createdAt) {
      const date = new Date(message.createdAt);
      const roundedMinutes = Math.floor(date.getMinutes() / 10) * 10;
      date.setMinutes(roundedMinutes, 0, 0);
      const key = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(message);
    }
  });

  return Object.entries(groups);
}

export const MessageScreen = ({
    messages,
    user,
    isTicketClosed,
    onSend,
  }: {
    messages: Message[];
    user: User;
    isTicketClosed?: boolean;
    onSend: (message: string, type: string) => void;
  }) => {
    const fileInputRef = useRef<any>(null);
    const [message, setMessage] = useState<string>("");

    const groupedMessages = useMemo(() => groupMessagesByTime(messages), [messages]);
  
    const handleSendMessage = () => {
      onSend(message, "message");
      setMessage("");
    };
  
    const handleFileInputChange = (event: any) => {
      // When a file is selected, update the state
      console.log(event.target.files);
      if (!event.target.files.length) return;
      onSend(event.target.files[0], "image");
      // setSelectedFile(event.target.files[0]);
    };
  
    return (
      <div className="flex flex-col">
        <ScrollArea className="p-7 h-calc-message-screen">
          {/* Admin Messages on the left */}
          {/* <p className="flex justify-center text-xs mb-5">8:00 AM</p> */}
          {groupedMessages.map(([time, msgs]) => (
            <div key={`${time}-${Math.random()}`}>
              <p className="flex justify-center text-xs mb-5">{time}</p>
          {msgs?.map((msg: Message) => {
            let isAdminMsg = msg?.sentBy === user?._id;
            return (
              <>
                {msg?.mediaUrls?.map((media: string) => (
                  <div
                  key={msg.requestId + media}
                    className={`flex ${
                      isAdminMsg
                        ? "items-end justify-end mb-4"
                        : "items-start mb-4"
                    } `}
                  >
                    <Image
                      src={IMAGE_URL + media}
                      alt=""
                      width={150}
                      height={150}
                      className="rounded"
                    />
                  </div>
                ))}
                {msg?.body && (
                  <div
                    className={`flex ${
                      isAdminMsg
                        ? "items-end justify-end mb-4"
                        : "items-start mb-4"
                    } `}
                  >
                    {/* <div className="w-[55%]"> */}
                    <p
                      className={`${
                        isAdminMsg
                          ? "bg-backGroundColor w-[70%]"
                          : "bg-PrimaryColor text-white w-[55%]"
                        }  text-[0.75rem] leading-[1.25rem] rounded-[0.625rem] px-[0.938rem] py-[0.688rem]`}
                    >
                      {msg?.body}
                    </p>
                    {/* </div> */}
                  </div>
                )}
              </>
            );
          })}
            </div>
          ))}
          {/* <div className="flex items-start mb-4 ">
            <div className="">
              <p className="bg-PrimaryColor text-white rounded-xl p-2 text-sm flex flex-wrap w-[70%]">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
                qui esse pariatur duis deserunt mollit dolore cillum minim
                temporsadads
              </p>
            </div>
          </div>
  
          <div className="flex items-start mb-4 ">
            <div className="">
              <p className="bg-PrimaryColor rounded-xl p-2 text-white text-sm flex flex-wrap w-[70%]">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
                qui esse pariatur duis deserunt mollit dolore cillum minim
                temporsadads
              </p>
            </div>
          </div> */}
  
          {/* User Messages on the right (placeholder) */}
        </ScrollArea>
  
        {/* Admin Input Field at the bottom */}
        <div className="px-4">
          {isTicketClosed ? (
            <div className="text-red-500 flex items-center justify-center w-full">
              <p className="flex text-sm items-center">
                <AlertCircle size={16} className="mr-2" />
                This ticket is Mark as Complete and you can&apos;t send messages.
              </p>
            </div>
          ) : (
            <div className="flex items-center">
            <Image
              src={"/assets/Image/Link.svg"}
              alt="Message Icon"
              width={18}
              height={17}
              className="mr-2 cursor-pointer"
              onClick={() => fileInputRef?.current?.click()}
            />
            <input
              type="file"
              onChange={handleFileInputChange}
              accept="image/*"
              style={{ display: "none" }}
              // id="fileInput"
              ref={fileInputRef}
            />
            <Input
              type="text"
              placeholder="Type a message..."
              className="bg-backGroundColor rounded-full flex-grow h-[1.875rem] mx-[0.75rem] pl-[1rem] py-[0.313rem] border text-[0.75rem] leading-[1.25rem]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Image
              src={"/assets/Image/send.svg"}
              alt="Message Icon"
              width={17}
              height={17}
              className="cursor-pointer"
              onClick={handleSendMessage}
            />
          </div>
          )}
        </div>
      </div>
    );
  };