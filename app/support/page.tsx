import DashboardLayout from "@/app/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

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

const UserList = () => {
  // Replace this with your actual user list component
  return (
    <div className="flex flex-col gap-4">
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />
      <UserAvatar name="Ali Osaid" text="hello world" />

      {/* Display list of users */}
    </div>
  );
};

const ChatScreen = () => {
  // Replace this with your actual chat screen component
  return (
    <div className="flex gap-1">
      <UserAvatar name="Mekanna Cruz" text="mark as complete" />
    </div>
  );
};
const UserAvatar = ({ name, text }: { name: string; text: string }) => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src={"/assets/Image/userPhoto.png"}
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

const MessageScreen = () => {
  return (
    <div className="flex flex-col  w-full h-full">
      <div className="flex-grow overflow-auto p-4 border-r border-gray-300">
        {/* Admin Messages on the left */}
        <p className="flex justify-center text-xs mb-5">8:00 AM</p>
        <div className="flex items-end mb-4 justify-end">
          <div className="w-[55%]">
            <p className="bg-backGroundColor p-2  text-sm rounded-xl">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
            </p>
          </div>
        </div>
        <div className="flex items-start mb-4 ">
          <div className="">
            <p className="bg-PrimaryColor rounded-xl p-2 text-white text-sm flex flex-wrap w-[70%]">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt mollit dolore cillum minim temporsadads  
            </p>
          </div>
          
        </div>
        
        <div className="flex items-start mb-4 ">
          <div className="">
            <p className="bg-PrimaryColor rounded-xl p-2 text-white text-sm flex flex-wrap w-[70%]">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt mollit dolore cillum minim temporsadads  
            </p>
          </div>
        </div>
         
         
        
        {/* User Messages on the right (placeholder) */}
      </div>

      {/* Admin Input Field at the bottom */}
      <div className="flex-shrink-0 mb-12 mr-3">
        <div className="flex items-center">
        <Image src={'/assets/Image/Link.svg'} alt="Message Icon" width={20} height={10} className="mr-2"/>
          <Input
            type="text"
            placeholder="Type a message..."
            className="bg-backGroundColor rounded-md  flex-grow p-2 mr-2 border "
          />
         <Image src={'/assets/Image/send.svg'} alt="Message Icon" width={15} height={10} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};


export default function Support() {
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
                <UserList />
              </div>
            </div>

            {/* Right Side: Chat Screen */}

            <div className="w-[80%] p-5">
              <ChatScreen />
              <br />
              <hr />
              <MessageScreen />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
