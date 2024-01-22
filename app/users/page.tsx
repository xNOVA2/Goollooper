import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Users } from '@/components/User/Users';
import Pagination from '@/components/User/Pagination/Pagination';
import Search from '@/components/Searching/Search';
import {   dummyUsers3 } from '@/types/data';

export default function Page() {
  return (
    <DashboardLayout Active={2}>
        <div className="flex-grow flex flex-col m-2 border-1 bg-white rounded p-5">
          <div>
            <h1 className="font-bold text-4xl">Users</h1>
            <p className="text-subTitleColor mt-5">
              You can see the overall Users of Goollooper here
            </p>
            <Search isSubAdmin={false} />
            <div className="flex flex-col items-stretch space-y-14 flex-grow overflow-auto">
              {/* Adding overflow-auto to handle the content overflow */}
              <Users users={dummyUsers3} isSubAdmin={false} />
            </div>
          </div>
         

        {/* The div you want to stick to the bottom */}
        <div className='p-4 '>
          <Pagination />
        </div>
      </div>
   
    </DashboardLayout>
  );
}
