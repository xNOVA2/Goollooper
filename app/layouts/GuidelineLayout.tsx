import Link from "next/link";
import { ReactNode } from "react";

export default function GuidelineLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex w-full mx-3 mt-6">

        <div className="w-[30%] h-screen overflow-hidden  border-1 bg-white  p-5">
          <div className="flex flex-col mr-4">
            <h1 className="font-bold text-4xl mb-2">Guidelines</h1>
            <p className="text-subTitleColor mb-5 mt-3">You can manage</p>
            <ul className="mt-5 mx-3 flex flex-col gap-6">
              <li className="pt-2">
                <Link href={'/guideline'} className="text-sm">Terms & Conditions</Link>
              </li>
              <li className="pt-2">
                <Link href={"/guideline/privacy"} className="text-sm">Privacy Policy</Link>
              </li>
              <li className="pt-2">
                <Link href={"/guideline/faq"} className="text-sm">FAQ</Link>
              </li>
              <li className="mt-2">
                <Link href={"/guideline/Interest"} className="text-sm">Task Interests (Categories)</Link>
              </li>
              <li className="mt-2">
                <Link href={"/guideline/Volunteer"} className="text-sm">Volunteer</Link>
              </li>
              {/* Add more list items as needed */}
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
