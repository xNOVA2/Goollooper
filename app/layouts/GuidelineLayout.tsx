import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const GuidelineLinks = [
  {
    title: "Terms & Conditions",
    link: "/guideline",
  },
  {
    title: "Privacy Policy",
    link: "/guideline/privacy",
  },
  {
    title: "FAQ",
    link: "/guideline/faq",
  },
  {
    title: "Task Interests (Categories)",
    link: "/guideline/Interest",
  },
  {
    title: "Volunteer",
    link: "/guideline/Volunteer",
  },
];

export default function GuidelineLayout({ children }: { children: ReactNode }) {
  const currentActivePath = usePathname();
  const currentPath = currentActivePath.split("/").pop();

  return (
    <>
      <div className="flex w-full mx-3 mt-6">

        <div className="w-[25.188em] h-screen overflow-hidden border border-border rounded-md bg-white  px-[1.75em] py-[1.813em]">
          <div className="flex flex-col">
            <h1 className="font-bold text-[1.875rem] leading-[2.813rem]">Guidelines</h1>
            <p className="text-subTitleColor text-[0.875rem] leading-[1.313rem] mb-[1.7rem] mt-[0.5rem]">You can manage</p>
            <ul className="flex flex-col gap-0">
              {GuidelineLinks.map((item) => (
                <li key={item.link} className={`py-[0.938em] px-[1.188em] rounded-md 
                ${ currentPath === item.link.split('/').pop() ? "border border-border font-semibold shadow-custom" : ""}`
                }>
                  <Link href={item.link} className="text-[0.875rem] leading-[1.313rem]">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="mx-2 w-full">
            {children}
        </div>

      </div>
    </>
  );
}
