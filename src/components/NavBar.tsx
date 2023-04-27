'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { truncate } from '@/store';
import { useCelo } from '@celo/react-celo';
import { toast } from 'react-hot-toast';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose, MdOutlineLogout } from 'react-icons/md';
import { useContractKit } from '@celo-tools/use-contractkit';

const NavBar = () => {
  const { connect, address } = useContractKit();
  const [opened, setOpened] = useState(false);
  const handleOpened = () => {
    setOpened(!opened);
  };
  const connectWallet= async() =>{
    try {
      await connect();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className=' sm:px-8 bg-[#2db369] z-20 mx-auto w-full fixed shadow-sm text-gray-50'>
      <div className=' flex items-center justify-between py-4 sm:mx-0 mx-4 '>
        <Link href={'/'}>
          <h1 className='font-black text-4xl'>Yob</h1>
        </Link>
        {/* tablet laptop */}
        <div className=''>
          <ul className='sm:flex justify-center gap-4 lg:mx-gap-10 text-gray-50 hidden font-medium'>
            <Link href={'/'}>
              <li className='cursor-pointer'>Home</li>
            </Link>
            <Link href={'/about'}>
              <li className='cursor-pointer'>About</li>
            </Link>
            <Link href={'/myEvents'}>
              <li className='cursor-pointer'>My events</li>
            </Link>
            <Link href={'/myTickets'}>
              <li className='cursor-pointer'>My tickets</li>
            </Link>
          </ul>
        </div>
        {/* phone */}
        <div className={opened ? 'block' : 'hidden'}>
          <ul className='fixed top-0 left-0 bottom-0 gap-3 flex flex-col shadow-xl overflow-hidden  w-5/6 max-w-sm py-6 px-6 bg-[#000] overflow-y-auto'>
            <Link href={'/'}>
              <li
                className='cursor-pointer text-lg font-medium'
                onClick={() => handleOpened()}
              >
                Home
              </li>
            </Link>
            <Link href={'/about'}>
              <li
                className='cursor-pointer text-lg font-medium'
                onClick={() => handleOpened()}
              >
                About
              </li>
            </Link>
            <Link href={'/myEvents'}>
              <li
                className='cursor-pointer text-lg font-medium'
                onClick={() => handleOpened()}
              >
                My events
              </li>
            </Link>
            <Link href={'/myTickets'}>
              <li
                className='cursor-pointer text-lg font-medium'
                onClick={() => handleOpened()}
              >
                Mytickets
              </li>
            </Link>
         
          </ul>
        </div>

        <div className='flex gap-1.5 items-center'>
          {address ? (
            <div className='flex items-center gap-3'>
              <button
                disabled
                type='button'
                className=' sm:block bg-white font-medium  px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl text-gray-900 my-1 cursor-none'
              >
                {truncate(address.toLocaleLowerCase(), 6, 6, 15)}
              </button>
            </div>
          ) : (
            <button
              type='button'
              className=' sm:block bg-white font-medium  px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl text-gray-900 my-1 cursor-pointer'
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </button>
          )}

          {opened ? (
            <div className='sm:hidden block'>
              <MdClose className='text-3xl' onClick={() => handleOpened()} />
            </div>
          ) : (
            <div className='sm:hidden block'>
              <HiMenuAlt3 className='text-3xl' onClick={() => handleOpened()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
