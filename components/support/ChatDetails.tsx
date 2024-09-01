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
              <div className="w-[63%]">
                <div className="flex gap-1 border-b border-border p-5">
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