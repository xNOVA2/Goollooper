import Image from "next/image";
import { User } from "@/types/type";
import { IMAGE_URL } from "@/lib/constants";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UserModal({ user }: { user: User }) {

  return (
    <DialogContent className="h-[85%] w-[30%] overflow-auto">
      <DialogHeader>
        <DialogTitle className="mx-auto pb-4">User&#8217;s Profile</DialogTitle>
        <hr className="" />
        <DialogDescription>
          <div className="flex flex-col justify-between item h-[420px]">
            <div className="flex items-center flex-col mt-10 h-[30%]">
                <Image
                  className="rounded-full object-cover w-[6.125rem] h-[6.125rem]"
                  src={
                    user.profileImage
                      ? `${IMAGE_URL}${encodeURIComponent(user.profileImage)}`
                      : "/assets/Image/userPhoto.png"
                  }
                  alt="profile-image"
                  width={98}
                  height={98}
                />
              <h1 className="mt-2 font-bold text-black text-xl">
                {`${user.firstName} ${user.lastName}`}
              </h1>

              <div className="mt-3 text-center">
                <p>{user?.role === 3 ? "Tasker" : "Not a Tasker"}</p>
              </div>
            </div>
            <div className="mt-24">
              <h1 className="text-black font-bold text-xl">Personal Info</h1>
              <div className="">
                <div className=" p-2 flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">
                    Email Address
                  </h1>
                  {user.email}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Phone number</h1>
                  {user.phone}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Gender</h1>
                  {user.gender}
                </div>
                <div className="p-2  flex justify-between bg-backGroundColor">
                  <h1 className="text-black font-bold text-md">Age</h1>
                  {user?.age}
                </div>
              </div>
            </div>
            {user?.role === 2 ? (
              <div className="mt-6">
                <h1 className="text-xl font-bold text-black mb-3">Gallery</h1>

                {user?.galleryImages?.length ? (
                  <div className="flex flex-wrap gap-3">
                    {user?.galleryImages?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={`${IMAGE_URL}${image}`}
                        alt="user-picture"
                        width={150}
                        height={150}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                ) : (
                  <h4 className="text-center">No Images</h4>
                )}
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Visuals validation
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.visualFiles?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={`${IMAGE_URL}${image}`}
                        alt="user visuals"
                        width={150}
                        height={150}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Brand Information
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.company?.logo && (
                        <Image
                        src={`${IMAGE_URL}${user?.company?.logo}`}
                        alt="user visuals"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                        />
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Professional Certifications
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.certificates?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={`${IMAGE_URL}${image}`}
                        alt="user certificate"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Licensing
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.licenses?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={`${IMAGE_URL}${image}`}
                        alt="user license"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Insurances
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {user?.insurances?.map((image: string) => (
                      <Image
                        key={user._id + image}
                        src={`${IMAGE_URL}${image}`}
                        alt="user insurance"
                        width={250}
                        height={250}
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
