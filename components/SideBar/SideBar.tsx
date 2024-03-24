"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import Logo1 from "@/public/assets/Image/Logo.svg";
import Logo2 from "@/public/assets/Image/Logo2.svg";
import DashboardSVG from "@/public/assets/Image/Dashboard.svg";
import UserSVG from "@/public/assets/Image/users.svg";
import SubAdminSVG from "@/public/assets/Image/SubAdmin.svg";
import SupportSVG from "@/public/assets/Image/Support.svg";
import GuidelineSVG from "@/public/assets/Image/Guideline.svg";
import NotificationSVG from "@/public/assets/Image/PushNotification.svg";

import { removeUser } from "@/store/actions/userAction";
import { RootState } from "@/store/reducers/rootReducer";
import { logout } from "@/api";

export default function SideBar({
  children,
  Active,
}: {
  children?: React.ReactNode;
  Active?: number;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const refreshToken = useSelector(
    (state: RootState) => state.userReducer.refreshToken
  );

  const AllLinks = [
    {
      Logo: DashboardSVG,
      category: "Dashboard",
      id: 1,
      path: "/dashboard",
    },
    {
      Logo: UserSVG,
      category: "Users",
      id: 2,
      path: "/users",
    },
    {
      Logo: SubAdminSVG,
      category: "SubAdmin",
      id: 3,
      path: "/SubAdmin",
    },
    {
      Logo: SupportSVG,
      category: "Support",
      id: 4,
      path: "/support",
    },
    {
      Logo: GuidelineSVG,
      category: "Guideline",
      id: 5,
      path: "/guideline",
    },
    {
      Logo: NotificationSVG,
      category: "PushNotification",
      id: 6,
      path: "/notifcation",
    },
  ];

  const onLogout = async () => {
    try {
      let logotRes: any = await logout({
        refreshToken,
      });
      dispatch(removeUser());
      toast.success(logotRes?.data?.msg);
      router.push("/");
    } catch (error: Error | any) {
      if (typeof error?.response?.data?.data === "object") {
        error?.response?.data?.data?.map((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.msg);
      }
    }
  };

  return (
    <>
      <aside className="fixed min-h-screen w-64 flex-col overflow-y-auto  py-8 z-10 bg-white">
        <div className="flex items-center space-x-2 px-5">
          <Image src={Logo1} alt="" width={50} height={20} />
          <Image src={Logo2} alt="" width={100} height={60} />
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between px-5">
          <nav className="space-y-6">
            {AllLinks.map((item) => (
              <div className="space-y-3" key={item.id}>
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href={item.path}
                >
                  <Image
                    src={`/assets/Image/${item.category}.svg`}
                    alt="Icon"
                    width={20}
                    height={20}
                    className="fill-red-700"
                    style={{ fill: "red", color: "red" }}
                  />{" "}
                  <span
                    className={`mx-2 text-sm font-medium ${
                      Active === item.id ? "text-PrimaryColor" : null
                    }`}
                  >
                    {item.category}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Add the main content here */}
      <div className=" overflow-x-hidden overflow-y-auto ">
        {/* Your main content goes here */}
        <nav className="relative  items-center flex justify-end  px-9 pt-9  mr-1 pb-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/change-password"}>Change Password</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex-1 overflow-x-hidden overflow-y-auto ml-64 bg-backGroundColor  pl-1">
          {children}
        </div>
      </div>
    </>
  );
}
