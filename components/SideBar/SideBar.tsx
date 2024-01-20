import Image from "next/image";
import Logo1 from "@/public/assets/Image/Logo.svg";
import Logo2 from "@/public/assets/Image/Logo2.svg";

import DashboardSVG from "@/public/assets/Image/Dashboard.svg";
import UserSVG from "@/public/assets/Image/users.svg";
import SubAdminSVG from "@/public/assets/Image/SubAdmin.svg";
import SupportSVG from "@/public/assets/Image/Support.svg";
import GuidelineSVG from "@/public/assets/Image/Guideline.svg";
import NotificationSVG from "@/public/assets/Image/PushNotification.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function SideBar({
  children,
  Active,
}: {
  children?: React.ReactNode;
  Active?: number;
}) {
  const AllLinks = [
    {
      Logo: DashboardSVG,
      category: "Dashboard",
      id: 1,
      path: "/Dashboard",
    },
    {
      Logo: UserSVG,
      category: "Users",
      id: 2,
      path: "/SubadminDashboard",
    },
    {
      Logo: SubAdminSVG,
      category: "SubAdmin",
      id: 3,
      path: "/UserDashboard",
    },
    {
      Logo: SupportSVG,
      category: "Support",
      id: 4,
      path: "/SupportDashboard",
    },
    {
      Logo: GuidelineSVG,
      category: "Guideline",
      id: 5,
      path: "/GuidelinePage",
    },
    {
      Logo: NotificationSVG,
      category: "PushNotification",
      id: 1,
      path: "/PushNotificationDashboard",
    },
  ];

  return (
    <>
      <aside className="fixed h-screen w-64 flex-col overflow-y-auto  py-8 z-10 bg-white">
        <div className="flex items-center space-x-2 px-5">
          <Image src={Logo1} alt="" width={50} height={20} />
          <Image src={Logo2} alt="" width={100} height={60} />
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between px-5">
          <nav className="space-y-6">
            {AllLinks.map((item) => (
              <div className="space-y-3" key={item.id}>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Image
                    src={`/assets/Image/${item.category}.svg`}
                    alt="Icon"
                    width={20}
                    height={20}
                    className=""
                  />{" "}
                  <span className={`mx-2 text-sm font-medium ${Active == item.id ? 'text-PrimaryColor' : null}`}>
                    {item.category}
                  </span>
                </a>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Add the main content here */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Your main content goes here */}
        <nav className="items-center flex justify-end  px-9 pt-9  mr-1 pb-2">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nav>

        <div className="flex-1 overflow-x-hidden overflow-y-auto ml-64 bg-backGroundColor p-1">
            {children}
        </div>
      </div>
    </>
  );
}
