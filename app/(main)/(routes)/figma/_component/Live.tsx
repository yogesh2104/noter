import React, { useCallback, useEffect, useState } from "react"
import LiveCursor from "./cursor/LiveCursor"
import { useMyPresence, useOthers } from "@/liveblocks.config"
import { CursorMode, CursorState } from "@/constants/types"
import CursorChat from "./cursor/CursorChat"

const Live=()=>{
    const others= useOthers()
    const [{cursor}, updateMyPresence]= useMyPresence() as any;
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
    
        // if cursor is not in reaction selector mode, update the cursor position
        if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
          // get the cursor position in the canvas
          const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
          const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    
          // broadcast the cursor position to other users
          updateMyPresence({
            cursor: {
              x,
              y,
            },
          });
        }
      }, []);

      const handlePointerLeave = useCallback(() => {
        setCursorState({
          mode: CursorMode.Hidden,
        });
        updateMyPresence({
          cursor: null,
          message: null,
        });
      }, []);

      const handlePointerDown = useCallback(
        (event: React.PointerEvent) => {
          // get the cursor position in the canvas
          const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
          const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    
          updateMyPresence({
            cursor: {
              x,
              y,
            },
          });
    
          // if cursor is in reaction mode, set isPressed to true
          setCursorState((state: CursorState) =>
            cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
          );
        },
        [cursorState.mode, setCursorState]
    );

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
          if(e.key==='/'){
            setCursorState({
              mode:CursorMode.Chat,
              previousMessage:null,
              message:""
            })
          }else if(e.key==='Escape'){
            updateMyPresence({message:""})
            setCursorState({mode:CursorMode.Hidden})
          }
        };
    
        const onKeyDown = (e: KeyboardEvent) => {
          if(e.key==='/'){
            e.preventDefault()
          }
        };
    
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("keydown", onKeyDown);
    
        return () => {
          window.removeEventListener("keyup", onKeyUp);
          window.removeEventListener("keydown", onKeyDown);
        };
      }, [updateMyPresence]);

    return(
        <div 
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        className="h-[100vh] w-full flex justify-center items-center text-center"
        >
        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
            />
        )}


        <LiveCursor others={others}/>
        </div>
    )
}

export default Live