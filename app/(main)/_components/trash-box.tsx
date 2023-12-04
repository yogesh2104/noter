"use client"

import { api } from "@/convex/_generated/api";
import { useQuery,useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

const TrashBox = () => {
    const router=useRouter()
    const params=useParams()
    const doucments=useQuery(api.documents.GetArchive)
    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search,setSearch]=useState('')

    const filterDocuments =  doucments?.filter((doc)=>{
        return doc.title.toLowerCase().includes(search.toLowerCase())
    });

    const OnClick=(documentId:string)=>{
        router.push(`/documents/${documentId}`)
    }

    



    return ( 
        <div>
            trashbox
        </div>
     );
}
 
export default TrashBox;