"use client"

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'usehooks-ts'
import UserItem from "./useritem";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./nav-tem";
import { toast } from "sonner";
import DocumentList from "./document-list";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-setting";
// Popover component
import { Popover,PopoverTrigger,PopoverContent } from "@/components/ui/popover";


const Navigation = () => {
    const settings=useSettings()
    const search=useSearch()
    const pathname=usePathname()
    const isMobile=useMediaQuery("(max-width:768px)");
    const isResizingRef=useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef=useRef<ElementRef<"div">>(null);
    const [isResetting,setIsReseting]=useState(false);
    const [isCollapsed,setIsCollapsed]=useState(isMobile);

    // const documents=useQuery(api.documents.getSideBar); //this is only get the title of newely created documents


    const create=useMutation(api.documents.create);


    useEffect(()=>{
        if(isMobile){
            collapes()
        }else{
            resetWidth()
        }
    },[isMobile])

    useEffect(()=>{
        if(isMobile){
            collapes()
        }
    },[isMobile,pathname])

    const handleMouseDown=(event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
       event.preventDefault();
       event.stopPropagation();
       
       isResizingRef.current=true
    
       document.addEventListener("mousemove",handleMouseMove)
       document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove=(e:MouseEvent)=>{
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
    
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
    
        if (sidebarRef.current && navbarRef.current) {
          sidebarRef.current.style.width = `${newWidth}px`;
          navbarRef.current.style.setProperty("left", `${newWidth}px`);
          navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    }

    const handleMouseUp=(e:MouseEvent)=>{
        isResizingRef.current=false;
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth=()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setIsReseting(true);

            sidebarRef.current.style.width =isMobile ? "100%":'240px'
            navbarRef.current.style.setProperty('width',isMobile? "0":"calc(100%-240px)");
            navbarRef.current.style.setProperty('left',isMobile?"100%":"240px")

            setTimeout(()=>setIsReseting(false),300)
        }
    }

    const collapes=()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(true)
            setIsReseting(true)

            sidebarRef.current.style.width='0';
            navbarRef.current.style.setProperty('width',"100%");
            navbarRef.current.style.setProperty('left',"0");

            setTimeout(()=>setIsReseting(false),   300)
        }
    }

    const handleCreate=()=>{
      const promise=create({title: 'Untitled Document'});

      toast.promise(promise,{
        loading : "Creating new document...",
        success : "New Note created",
        error : "Error Creating New Document"
      })
    }

    return ( 
        <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapes}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem/>
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen}/>
          <Item label="Setting" icon={Settings} onClick={settings.onOpen}/>
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle}/>
        </div>
        <div className="mt-4">
          <DocumentList/>
          <Item onClick={handleCreate} icon={Plus} label="Add a Page"/>
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash}/>
            </PopoverTrigger>
            <PopoverContent 
            className="p-0 w-72"
            side={isMobile? "buttom":"right"} >
              <TrashBox/>

            </PopoverContent>
          </Popover>
         {/* {documents?.map((document) =>(
          <p key={document._id}>{document.title}</p>
         ))} */}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>
      </div>

    </>
     );
}
 
export default Navigation;