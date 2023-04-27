'use client';
import { useGlobalState } from '@/store'
import { useContractKit } from '@celo-tools/use-contractkit'
import React from 'react'
import Hero from './Hero'
import Events from './Events'



const LandingPage = () => {
  const {address} = useContractKit()
  return (
    <div className='py-24 sm:py-28 max-w-4xl mx-auto'>
      <Hero/>
      <div className='pb-10 sm:pb-10 text-white'>
        {address?(
          <h2 className='font-semibold text-2xl text-center sm:text-left'>Latest events</h2>
        ):(
          <p className='font-bold text-center pt-5'>Please, Connecte Your Celo extension wallet!</p>
          
        )}
        
      </div>
      <Events/>
    </div>
  )
}

export default LandingPage