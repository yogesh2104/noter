"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import Logo from "./_components/logo";

const NavBarPage = () => {
    const scrolled=useScrollTop()

    return ( 
        <div className={cn(
            "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-md"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">
                <ModeToggle/>
            </div>
        </div>
     );
}
 
export default NavBarPage;