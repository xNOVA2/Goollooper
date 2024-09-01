"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { sendMedia } from "@/api";
import socketServcies from "@/lib/socket";
import { RootState } from "@/store/reducers/rootReducer";
import { Chat } from "@/types/type";
import { ChatList } from "@/components/support/ChatList";
import { ChatDetails } from "@/components/support/ChatDetails";

export default function SupportPage() {
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

  console.log({ user });
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
        <div className="flex-grow flex flex-col m-2 border border-border bg-white rounded">
          <div className="flex-grow flex">
            {/* Left Side: User List and Search */}
            <ChatList chats={chats} user={user} onClick={onUserClick} />

            {/* Right Side: Chat Screen */}
            <ChatDetails chatData={chatData} messages={messages} user={user} handleSendMessage={handleSendMessage}/>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
