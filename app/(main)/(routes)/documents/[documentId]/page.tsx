"use client"

import React from 'react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Toolbar from '@/components/toolbar'
import { Cover } from '@/components/cover'


interface DocumentIdPageProps{
  params:{
    documentId:Id<"documents">
  }
}

const DocumentIdPage = ({params}:DocumentIdPageProps) => {
  
  const document = useQuery(api.documents.getById,{
    documentId:params.documentId
  })
  
  if(document === undefined){
    return(
      <div>Loaddding .....</div>
    )
  }

  if(document === null ){
    return(
      <div>Not Found</div>
    )
  }


  return (
    <div className='pb-40'>
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Cover url={document.coverImage}/>
        <Toolbar initialData={document}/>
      </div>
    </div>
  )
}

export default DocumentIdPage