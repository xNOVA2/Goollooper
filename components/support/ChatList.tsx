import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chat, User } from '@/types/type';
import { SearchBar } from './SearchBar';
import { UserList } from './UserList';

export const ChatList = ({
    chats,
    user,
    onClick,
  }: {
    chats: Chat[];
    user: User;
    onClick: (chatData: Chat | null) => void;
  }) => {
  const [listHeight, setListHeight] = useState(0);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (containerRef.current && headerRef.current && tabsRef.current && searchRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const headerHeight = headerRef.current.clientHeight;
        const tabsHeight = tabsRef.current.clientHeight;
        const searchHeight = searchRef.current.clientHeight;
        const newHeight = containerHeight - headerHeight - tabsHeight - searchHeight - 20; // 20px for padding
        setListHeight(newHeight);
      }
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  return (
    <div ref={containerRef} className="w-[37%] border-r border-border flex flex-col h-screen">
      <div ref={headerRef} className="border-b border-border mb-2 pl-8 pb-2 pt-10 flex-shrink-0">
        <h1 className="font-bold text-4xl mb-4">Support</h1>
        <p className="text-subTitleColor mb-5">You can chat users here</p>
      </div>

      <Tabs defaultValue="mobileApp" className="flex flex-col flex-grow">
        <TabsList ref={tabsRef} className="grid grid-cols-2 h-12 p-0 border border-border mx-5 flex-shrink-0">
          <TabsTrigger value="mobileApp" className="h-[46px] rounded-r-none p-0 m-0 bg-white data-[state=active]:bg-PrimaryColor data-[state=active]:text-white">
            Mobile App
          </TabsTrigger>
          <TabsTrigger value="website" className="h-[46px] rounded-l-none p-0 m-0 bg-white data-[state=active]:bg-PrimaryColor data-[state=active]:text-white">
            Website
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mobileApp" className="flex-grow flex flex-col px-5">
          <div ref={searchRef} className="mb-5 flex-shrink-0">
            <SearchBar />
          </div>
          <ScrollArea className="flex-grow" style={{ height: `${listHeight}px` }}>
            <UserList chats={chats} user={user} onClick={onClick} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="website">Website support chat section</TabsContent>
      </Tabs>
    </div>
  );
};