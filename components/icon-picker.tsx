"use client"

import EmjiPicker, { Theme } from "emoji-picker-react"
import { useTheme } from "next-themes"


import { 
    Popover,
    PopoverTrigger,
    PopoverContent 
} from '@/components/ui/popover';

interface IconPickerProps{
    onChange:(icon:string)=>void;
    children:React.ReactNode;
    asChild?:boolean;
}


const IconPicker = ({onChange, children, asChild}:IconPickerProps) => {
    const {resolvedTheme} = useTheme();
    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

    const themeMap={
        "dark":Theme.DARK,
        "light":Theme.LIGHT
    }

    const theme =  themeMap[currentTheme]

    return (  
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-2 w-full border-none shadow-none">
                <EmjiPicker 
                    height={350} 
                    theme={theme} 
                    onEmojiClick={(data)=>onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    );
}
 
export default IconPicker;