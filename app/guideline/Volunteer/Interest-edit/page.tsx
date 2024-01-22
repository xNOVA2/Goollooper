import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <>
      <DashboardLayout>
        <GuidelineLayout>
          <div>
            <div className="bg-white  h-full mx-4 rounded-md  p-5 ">
              <div className=" ">
                <h1 className="font-bold text-3xl ">Volunteer</h1>
              </div>
              <div className="mt-3">
                <Input
                  placeholder="type here "
                  className="py-8 px-10 border-0 bg-backGroundColor "
                />
              </div>
              <div className="mt-5 flex justify-end">
                <Button className="px-20 rounded-full bg-PrimaryColor">
                  Add Sub Category
                </Button>
              </div>

              <div className="min-h-screen">
                <h1 className="font-bold text-4xl mt-5 text-black ">
                    List
                </h1>
                <div className="flex flex-wrap gap-5 mt-6">

                <Category text="Conservation" />
                <Category text="Gardening & Farm Work" />
                <Category text="Climate Change" />
                <Category text="Gardening & Farm Work" />

                </div>
              </div>
            </div>
          </div>
        </GuidelineLayout>
      </DashboardLayout>
    </>
  );
}

const Category = ({text}:{text:string}) => {
    return (
        <div
        className="relative inline-block px-4 py-3 m-2   shadow-md border-white bg-white border-1 rounded-md"
      
      >
        <span >{text}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0  cursor-pointer "
          style={{ right: -10, top: -1 }}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <circle cx="11" cy="11" r="11" fill="#FF5C5C" />
          <path
            d="M13.9972 13.9133L8.22852 8.14453"
            stroke="#363738"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.9406 8.19824L8.14453 13.9943"
            stroke="#363738"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
};
