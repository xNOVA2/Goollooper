"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/layouts/DashboardLayout";

import { sendMedia } from "@/api";
import { IMAGE_URL } from "@/lib/constants";
import socketServcies from "@/lib/socket";
import { RootState } from "@/store/reducers/rootReducer";
import { Chat, User, Message } from "@/types/type";

const SearchBar = () => {
  // Replace this with your actual search component
  return (
    <div>
      <div className="relative">
        <Input
          className=" bg-backGroundSecondaryColor  px-9"
          placeholder="Searching"
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
  );
};

const UserList = ({
  chats,
  user,
  onClick,
}: {
  chats: Chat[];
  user: User;
  onClick: (chatData: Chat | null) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {chats?.map((msg: any) => (
        <UserAvatar
          name={
            msg?.participants.find((userObj: any) => userObj?._id !== user?._id)
              ?.firstName
          }
          image={
            msg?.participants?.find(
              (userObj: any) => userObj?._id !== user?._id
            )?.profileImage
          }
          text={msg?.lastMessage?.body}
          chatData={msg}
          chatId={msg?._id}
          onUserClick={onClick}
        />
      ))}
      {/* <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" /> */}

      {/* Display list of users */}
    </div>
  );
};

// const ChatScreen = () => {
//   // Replace this with your actual chat screen component
//   return (
//     <div className="flex gap-1">
//       <UserAvatar name="Mekanna Cruz" text="mark as complete" />
//     </div>
//   );
// };

const UserAvatar = ({
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
      className="flex items-center gap-1"
      onClick={() => (onUserClick ? onUserClick(chatData || null) : {})}
    >
      <Image
        src={image ? IMAGE_URL + image : "/assets/Image/userPhoto.png"}
        alt=""
        width={45}
        height={45}
        className="rounded-full"
      />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

const MessageScreen = ({
  messages,
  user,
  onSend,
}: {
  messages: Message[];
  user: User;
  onSend: (message: string, type: string) => void;
}) => {
  const fileInputRef = useRef<any>(null);
  const [message, setMessage] = useState<string>("");

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
    <div className="flex flex-col  w-full h-full">
      <div className="flex-grow overflow-auto p-4 border-r border-gray-300">
        {/* Admin Messages on the left */}
        {/* <p className="flex justify-center text-xs mb-5">8:00 AM</p> */}
        {messages?.map((msg: Message) => {
          let isAdminMsg = msg?.sentBy === user?._id;
          return (
            <>
              {msg?.mediaUrls?.map((media: string) => (
                <div
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
                    }  text-sm rounded-xl p-2`}
                  >
                    {msg?.body}
                  </p>
                  {/* </div> */}
                </div>
              )}
            </>
          );
        })}
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
      </div>

      {/* Admin Input Field at the bottom */}
      <div className="flex-shrink-0 mb-12 mr-3">
        <div className="flex items-center">
          <Image
            src={"/assets/Image/Link.svg"}
            alt="Message Icon"
            width={20}
            height={10}
            className="mr-2"
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
            className="bg-backGroundColor rounded-md  flex-grow p-2 mr-2 border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Image
            src={"/assets/Image/send.svg"}
            alt="Message Icon"
            width={15}
            height={10}
            className="cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default function Support() {
  const accessToken = useSelector(
    (state: RootState) => state.userReducer.accessToken
  );
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<any>([]);
  const [chatData, setChatData] = useState<Chat | null | any>(null);

  useEffect(() => {
    socketServcies.initializeSocket(accessToken);
    const reqData = {
      userId: user?._id,
      chatSupport: true,
      page: 1,
    };
    socketServcies.emit("getChats", reqData);
    socketServcies.on(`getChats/${user?._id}`, (data: any) => {
      console.log({ data });
      setChats(data);
    });

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chatData) return;
    console.log("-------1");
    socketServcies.on(
      `newMessage/${chatData._id}/${user?._id}`,
      (data: any) => {
        console.log(data, "new message received");
        setMessages((prev: any) => [data, ...prev]);
        // setMessages((prev) => {
        //   return [data, ...prev];
        // });
      }
    );
    console.log("-------2");
    const reqData = {
      userId: user?._id,
      chatId: chatData?._id,
    };
    console.log(reqData);

    socketServcies.emit("readMessages", reqData);
    socketServcies.on(
      `readMessages/${chatData?._id}/${user?._id}`,
      (data: any) => {
        console.log("-------");
      }
    );
    return () => {
      socketServcies.removeAllListener(
        `readMessages/${chatData?._id}/${user?._id}`
      );
    };
  }, [chatData]);

  // console.log({ chatData });
  const onUserClick = (chatDataObj: Chat | null) => {
    if (!chatDataObj) return;
    console.log({ chatDataObj });

    const reqData = {
      userId: user?._id,
      chatId: chatDataObj._id,
      page: 1,
    };
    setChatData(chatDataObj);
    socketServcies.emit("getChatMessages", reqData);
    socketServcies.on(`getChatMessages/${user?._id}`, (data) => {
      console.log("-------------", { data });

      setMessages(data?.messages?.reverse() || []);
    });
  };

  const handleSendMessage = async (data: string | any, type: string) => {
    console.log({ data });
    if (type === "image") {
      try {
        const response = await sendMedia(data);
        console.log({ response });

        console.log("Response");
        const reqData = {
          userId: user?._id,
          chatId: chatData?._id,
          messageBody: "",
          name: `${user?.firstName}`,
          mediaUrls: response?.data?.data,
        };
        console.log({ reqData });

        socketServcies.emit("sendMessage", reqData);
        const newMessage = {
          body: "",
          senderId: user?._id,
          sentBy: user?._id,
          mediaUrls: [response?.data?.data],
          type: "message",
          createdAt: new Date(),
        };
        setMessages((prev: any) => [...prev, newMessage]);
      } catch (error: any) {
        console.log(error?.response?.data, "ERROR FROM SENDING MEDIA!");
      }
    } else {
      if (data?.trim().length > 0) {
        const newMessage = {
          body: data,
          senderId: user?._id,
          sentBy: user?._id,
          type: "message",
          createdAt: new Date(),
        };
        const reqData = {
          userId: user?._id,
          chatId: chatData?._id,
          messageBody: data,
          name: `${user?.firstName}`,
        };
        console.log("--------", reqData);

        socketServcies.emit("sendMessage", reqData);
        console.log("--------");

        setMessages((prev: any) => [...prev, newMessage]);
      }
    }
  };

  // const handleSendPhoto = async (image) => {};

  return (
    <>
      <DashboardLayout Active={4}>
        <div className="flex-grow flex flex-col m-2 border-1 bg-white rounded p-5">
          <div className="flex-grow flex ">
            {/* Left Side: User List and Search */}
            <div className="w-[45%] p-5 border-r ">
              {/* Support Header */}
              <h1 className="font-bold text-4xl mb-2">Support</h1>
              {/* Subheading */}
              <p className="text-subTitleColor mb-5">You can chat users here</p>
              {/* Search Bar */}
              <div className="mb-5">
                <SearchBar />
              </div>
              {/* User List */}
              <div>
                <UserList chats={chats} user={user} onClick={onUserClick} />
              </div>
            </div>

            {/* Right Side: Chat Screen */}

            {chatData && (
              <div className="w-[80%] p-5">
                <div className="flex gap-1">
                  <UserAvatar
                    // name="Mekanna Cruz"
                    name={
                      chatData?.participants?.find(
                        (userObj: any) => userObj?._id !== user?._id
                      )?.firstName
                    }
                    image={
                      chatData?.participants?.find(
                        (userObj: any) => userObj?._id !== user?._id
                      )?.profileImage
                    }
                    text={chatData?.isTicketClosed ? "mark as complete" : ""}
                  />
                </div>
                <br />
                <hr />
                <MessageScreen
                  messages={messages}
                  user={user}
                  onSend={handleSendMessage}
                />
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
