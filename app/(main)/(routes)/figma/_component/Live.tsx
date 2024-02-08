import React, { useCallback } from "react"
import LiveCursor from "./cursor/LiveCursor"
import { useMyPresence, useOthers } from "@/liveblocks.config"

const Live=()=>{
    const others= useOthers()
    const [{cursor}, updateMyPresence]= useMyPresence() as any;

    const handlePointerMove = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();
        // subrating position of the cursor relative to the window not subtracting from cursor width.
        const x= event.clientX - event.currentTarget.getBoundingClientRect().x
        const y= event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({cursor:{x,y}})
    },[])

    const handlePointerLeave = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();
       
        updateMyPresence({cursor:null,message:null})
    },[])

    const handlePointerDown = useCallback((event:React.PointerEvent)=>{
        // subrating position of the cursor relative to the window not subtracting from cursor width.
        const x= event.clientX - event.currentTarget.getBoundingClientRect().x
        const y= event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({cursor:{x,y}})
    },[])

    return(
        <div 
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        className="h-[100vh] w-full flex justify-center items-center text-center"
        >
            <LiveCursor others={others}/>
        </div>
    )
}

export default Live