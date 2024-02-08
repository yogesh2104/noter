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

        </div>
    )
}

export default Cursor