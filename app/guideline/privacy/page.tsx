import React from 'react'
import Editor from '@/components/Editor/Editor'
import { privacy, terms } from '@/types/data'
import DashboardLayout from '@/app/layouts/DashboardLayout'
import GuidelineLayout from '@/app/layouts/GuidelineLayout'

export default function page() {
  return (
    <DashboardLayout>
    <GuidelineLayout>
       <div className='bg-white  h-full mx-4 rounded-md  '>
            <Editor value={privacy}/>
       </div>
    </GuidelineLayout>
    </DashboardLayout>

  )
}
