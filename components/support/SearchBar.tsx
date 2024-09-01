import Image from "next/image";
import { Input } from "../ui/input";

export const SearchBar = () => {
    // Replace this with your actual search component
    return (
      <div className="ml-8 mr-5">
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