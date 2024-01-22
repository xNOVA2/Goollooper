import React from 'react'
import GuidelineLayout from '../layouts/GuidelineLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Editor from '@/components/Editor/Editor'
import { terms } from '@/types/data'

export default function page() {
  return (
    <DashboardLayout Active={5}>
    <GuidelineLayout>
       <div className='bg-white  h-full mx-4 rounded-md  '>
            <Editor value={terms}/>
       </div>
    </GuidelineLayout>
    </DashboardLayout>

  )
}
