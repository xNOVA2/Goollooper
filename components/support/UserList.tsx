import { Chat, User } from "@/types/type";
import { UserAvatar } from "./UserAvatar";

export const UserList = ({
    chats,
    user,
    onClick,
  }: {
    chats: Chat[];
    user: User;
    onClick: (chatData: Chat | null) => void;
  }) => {
    return (
      <div>
        {chats?.map((msg: any) => (
          <UserAvatar
            key={msg._id}
            text={msg?.lastMessage?.body}
            chatData={msg}
            chatId={msg?._id}
            onUserClick={onClick}
            isList={true}
          />
        ))}
      </div>
    );
  };