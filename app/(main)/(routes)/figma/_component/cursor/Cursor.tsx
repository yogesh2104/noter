import { MousePointer2 } from "lucide-react"

type Props={
    color: string,
    x:number,
    y:number,
    message:string
}


const Cursor=({color,x,y,message}:Props)=>{
    return(
        <div
        className='pointer-events-none absolute left-0 top-0'
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        >
            <MousePointer2 color={color}/>

            {/* Show message */}
            {message && (
                <div className="absolute left-2 top-5 rounded-3xl px-4 py-2" style={{backgroundColor:color}}>
                    <p className="text-white whitespace-nowrap text-sm leading-relaxed">{message}</p>
                </div>
            )}

        </div>
    )
}

export default Cursor