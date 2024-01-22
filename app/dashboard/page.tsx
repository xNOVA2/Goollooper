import Image from "next/image";
import DashboardLayout from "../layouts/DashboardLayout";
import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import { dummyUsers } from "@/types/data";
import userIcon from '@/public/assets/Image/IconPNG.png'
export default function Page() {
  return (
    <DashboardLayout Active={1}>
      <div className="flex flex-col gap-4">
        <div className="m-2 border-1 bg-white w-full h-[300px] rounded p-5">
          <h1 className="font-bold text-4xl">Dashboard</h1>
          <p className="text-subTitleColor mt-4">
            You can see the statistics of Goollooper here
          </p>
          <hr className="mt-7" />

          <section className="flex items-center mt-10 justify-start gap-60">
            <div className="flex flex-col items-start space-y-1">
              <Image
                src={"/assets/Image/Icon.png"}
                alt="Users Icon"
                width={40}
                height={50}
              />
              <h1 className="text-lg font-extrabold pt-2">10,324</h1>
              <p className="text-sm font-bold text-subTitleColor">Total Users</p>
            </div>

            <div className="flex flex-col items-start space-y-1 ml-4">
              <Image
                src={userIcon}
                alt="Users Icon"
                width={40}
                height={50}
              />
              <h1 className="text-lg font-extrabold pt-2">9,043</h1>
              <p className="text-sm font-bold text-subTitleColor">
                Total Task Created
              </p>
            </div>
          </section>
        </div>

        <div className="m-2  border-1 bg-white w-full rounded p-5 ">
          <div className="">
            <h1 className="font-bold text-4xl">Recent Users Signed Up</h1>
            <p className="text-subTitleColor mt-5">
              You can see the recent signed up users here
            </p>

            <div className="mt-2 flex flex-col items-stretch space-y-14 w-full">
              {/* Assuming Users component handles dynamic data */}
              <Users users={dummyUsers}/>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
