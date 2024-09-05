import { UserAvatar } from "./UserAvatar";
import { MessageScreen } from "./MessageScreen";

export const ChatDetails = (
    {
        chatData,
        messages,
        user,
        handleSendMessage,
    }: {
        chatData: any;
        messages: any;
        user: any;
        handleSendMessage: (message: string | any, type: string) => void;
    }
) => {
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