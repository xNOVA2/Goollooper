"use client";
import React, { useEffect } from "react";
import { UserAvatar } from "./UserAvatar";
import { MessageScreen } from "./MessageScreen";
import { useDispatch } from "react-redux";
import { setCurrentActiveChat } from "@/store/Slices/PaymentSlice";

export const ChatDetails = (
    {
        chatData,
        messages,
        user,
        handleSendMessage,
        handleMarkAsComplete,
    }: {
        chatData: any;
        messages: any;
        user: any;
        handleSendMessage: (message: string | any, type: string) => void;
        handleMarkAsComplete?: (chatId: string) => void;
    }
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (chatData && chatData._id) {
            dispatch(setCurrentActiveChat(chatData._id));
        }
    }, [chatData, dispatch]);
    
    return (
        <>
        {chatData && (
          <div className="flex-grow">
            <div className="flex gap-1 border-b border-border pt-[1.438em] pb-[1.25em] pl-[1.75em]">
              <UserAvatar
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
                isTicketClosed={chatData?.isTicketClosed}
                handleMarkAsComplete={handleMarkAsComplete}
                chatId={chatData?._id}
                isList={false}
              />
            </div>

            <MessageScreen
              messages={messages}
                  user={user}
                  onSend={handleSendMessage}
                />
              </div>
            )}
        </>
    )
};