"use client"

import { useEffect,useState } from "react"
import { SettingModel } from "@/components/modals/settings-modal"

export const ModalProvider=()=>{
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    
    return(
        <>
            <SettingModel/>
        </>
    )
}