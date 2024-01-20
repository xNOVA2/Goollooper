import Image from 'next/image';
import React from 'react';

export default function Pagination() {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <p className='text-sm text-subTitleColor'>Showing 1 to 6 of 1,023 new entries</p>
      </div>
      <div className='flex items-center gap-1'>
        <button className=' text-black px-4 py-2 rounded   flex items-center'>
          <Image src={'/assets/Image/ArrowLeft.svg'} alt='Arrow Icon' width={5} height={5} />
          <span className='ml-2'>Previous</span>
        </button>
        <button className='bg-PrimaryColor text-white px-4 py-2 rounded '>1</button>
        <button className='bg-backGroundColor text-black px-4 py-2 rounded '>2</button>
        <button className='bg-backGroundColor text-black px-4 py-2 rounded'>3</button>
        <button className=' text-black px-4 py-2 rounded  flex items-center'>
          <span className='mr-2'>Next</span>
          <Image src={'/assets/Image/ArrowRight.svg'} className='' alt='Arrow Icon' width={5} height={5} />
        </button>
      </div>
    </div>
  );
}
