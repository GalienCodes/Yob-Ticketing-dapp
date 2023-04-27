import React from 'react';
import fanacial from '../public/emoji.png';
import Image from 'next/image';
import { setGlobalState, useGlobalState } from '../store';
import { useContractKit } from '@celo-tools/use-contractkit';
import toast from 'react-hot-toast';

function Hero() {
  const { address, connect } = useContractKit();
  const connectWallet = async () => {
    try {
      await connect();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='ms:pt-6 max-w-4xl mx-auto text-gray-50 '>
      <div className='mx-4 sm:mx-6 lg:mx-0'>
        <div className='flex flex-col sm:flex-row  items-center justify-between gap-4'>
          <div className='text-center sm:text-left w-full sm:w-4/5'>
            <h1 className='font-bold text-4xl lg:text-5xl pb-4'>
              We make it easier
            </h1>
            <h4 className='text-base sm:text-lg font-bold sm:font-bold capitalize '>
              Secured and Fast booking
            </h4>
            <p className='text-sm sm:text-base'>
              Experience the power of decentralized technology with Reserve.
              Your one-stop-shop for all ticket needs. The quickest way to book
              tickets.
            </p>
            <div className='flex gap-4 my-4 justify-center sm:justify-start'>
              {address && address ? (
                <button
                  className='px-4 py-2 rounded cursor-pointer bg-gray-900 text-white'
                  type='button'
                  onClick={() => setGlobalState('modal', 'scale-100')}
                >
                  Add Event
                </button>
              ) : (
                <button
                  className='px-4 py-2 rounded cursor-pointer bg-gray-900 text-white'
                  type='button'
                  onClick={connectWallet}
                >
                  connect Wallet
                </button>
              )}
            </div>
          </div>
          <Image
            src={fanacial}
            height={380}
            alt='fanacial-wallet'
            className='order-first sm:order-last'
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
