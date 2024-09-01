import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const Filter = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center px-7 bg-backGroundSecondaryColor py-2 gap-2 rounded-lg">
                    <Image
                        src={"/assets/Image/filter.svg"}
                        alt="Filter Icon"
                        width={14}
                        height={10}
                    />
                    <p>Filter</p>     
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <h4 className="px-3 py-2 hover:bg-backGroundSecondaryColor hover:cursor-pointer">User</h4>
                <h4 className="px-3 py-2 hover:bg-backGroundSecondaryColor hover:cursor-pointer">Service Provider</h4>
            </DropdownMenuContent>
        </DropdownMenu>
        
    );
}