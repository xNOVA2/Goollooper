import Image from "next/image";
import Picture from "@/public/assets/Image/BgPicture.png"; // Import your image file
import Logo from "@/public/assets/Image/Logo.svg";

import { AuthModule } from "@/types/type";
import Link from "next/link";

const AuthLayout: React.FC<AuthModule> = ({
  title,
  subText,
  children,
  additionalText,
}) => {
  console.log("AuthLayout");
  
  return (
    <div className="flex justify-start h-screen overflow-hidden">
      <section className="w-1/2 h-full">
        <Image alt="" className="object-cover w-full h-full" src={Picture} />
      </section>

      <section className="w-1/2 bg-backGroundColor">
        <div className="flex justify-end p-10">
          <Image width={100} height={100} src={Logo} alt="Logo" />
        </div>
        <div className="w-[50%] mx-auto my-10 bg-white h-auto rounded-md ">
          <div className=" rounded-xl">
            <div className="p-6 pt-10">
              <h1 className="text-3xl font-bold ">{title}</h1>
              <p className="text-sm text-gray-400 pt-3">{subText}</p>

              <hr className="mt-6" />
            </div>

            <div className="p-6 ">
              {children}
              <p className="flex justify-center mt-2 "> <Link href={'/'} className="text-PrimaryColor no-underline"> {additionalText}</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
