import SideBar from "@/components/SideBar/SideBar";

export default function DashboardLayout({
  children,
  Active,
}: {
  children?: React.ReactNode;
  Active?: number;
}) {
  return <SideBar Active={Active}>{children}</SideBar>;
}
