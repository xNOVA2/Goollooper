"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
    (state: RootState) => state.user.accessToken
  );
  const user = useSelector((state: RootState) => state.user.user);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<any>([]);
  const [chatData, setChatData] = useState<Chat | null | any>(null);

  const initializeSocket = useCallback(() => {
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

    try {
      socketServcies.on("closeChatSupportTicket/66c5cbc2750212bbdbe13157", (data: any) => {
        console.log("socket chat closed data:", { data });
      });
    } catch (error: any) {
      console.log("Mark as error", error);
    }

    return () => {
      socketServcies.disconnect();
    };
  }, [accessToken, user?._id]);

  useEffect(() => {
    const cleanup = initializeSocket();
    return cleanup;
  }, [initializeSocket]);

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
  }, [chatData, user?._id]);

  console.log({ user });
  const onUserClick = useCallback((chatDataObj: Chat | null) => {
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
  }, [user?._id]);

  const handleSendMessage = useCallback(async (data: string | any, type: string) => {
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
  }, [chatData, user]);

  const handleMarkAsComplete = useCallback((chatID: string) => {
    console.log("Mark as complete", chatID);
    try {
      socketServcies.emit("closeChatSupportTicket", { chat: chatID });
    } catch (error: any) {
      console.log("Mark as complete error", error);
    }
    console.log("Mark as complete success", chatID);
  }, []);

  const checkIsMarkAsComplete = useCallback((userID: string) => {
    try {
      socketServcies.on(`closeChatSupportTicket/${userID}`, (data: any) => {
        console.log("socket chat closed data:", { data });
      });
    } catch (error: any) {
      console.log("Mark as error", error);
    }
  }, []);
    

  // const handleSendPhoto = async (image) => {};

  return (
    <>
      <DashboardLayout Active={4}>
        <div className="h-calc-screen flex flex-row m-2 border border-border bg-white rounded">
          {/* Left Side: User List and Search */}
          <ChatList chats={chats} user={user} onClick={onUserClick} />

          {/* Right Side: Chat Screen */}
          <ChatDetails chatData={chatData} messages={messages} user={user} handleSendMessage={handleSendMessage} handleMarkAsComplete={handleMarkAsComplete} />
        </div>
      </DashboardLayout>
    </>
  );
}
