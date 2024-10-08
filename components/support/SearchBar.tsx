import Image from "next/image";
import { Input } from "../ui/input";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    // Replace this with your actual search component
    return (
      <div className="ml-[1.938em] mr-[1.25em] h-[2.25em]">
        <div className="relative">
          <Input
            className=" bg-backGroundSecondaryColor  px-9"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
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