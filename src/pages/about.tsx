import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai';


const About = () => {
  return (
    <div className='py-24 sm:py-28 max-w-4xl mx-auto text-white'>
      <div className=' mx-4'>
      <h2 className='font-semibold text-2xl'>About the App</h2>
          <div className='py-4'>
            <h2 className='text-sm text-white'><span className='font-black text-3xl mr-2'>Yob</span> A ticket booking Dapp offers secure, fast and decentralized transactions for booking tickets online. It eliminates the need for intermediaries and ensures data privacy, reducing fraud and enabling efficient ticketing. The mains points are:</h2>  
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 '>
            <div  className='text-sm rounded p-4 bg-[#2db369] shadow-md'>
              <h1 className='bg-[#2db369] text-gray-50 w-10 h-10 text-center p-2 rounded-full mb-2  text-xl font-bold shadow-lg'>1</h1>
              <p>
              The purpose of this Yob is to provide a platform for the sale and purchase of event tickets,Users can purchase tickets for events through the smart contract and their purchases will be recorded and tracked.
              </p>
            </div>
            <div className='text-sm rounded p-4 bg-[#2db369] shadow-md'> 
            <h1 className='bg-[#2db369] text-gray-50 w-10 h-10 text-center p-2 rounded-full mb-2  text-xl font-bold shadow-lg'>2</h1>
            <p>
            It allows event organizers to add details of an event, including ticket prices and number of tickets available.
            Users can purchase tickets for events through the smart contract and their purchases will be recorded and tracked.
            </p>
            </div>
            <div className='text-sm rounded p-4 bg-[#2db369] shadow-md'>
              <h1 className='bg-[#2db369] text-gray-50 w-10 h-10 text-center p-2 rounded-full mb-2 text-xl font-bold shadow-lg'>3</h1>
              <p>
              Yob also includes a requirement for the event owner to pay a minimum amount of CELO before adding an event.
              </p>
            </div>
          </div>
          <div className='flex py-2 sm:py-4 justify-center items-center text-sm '>
            <a href="https://www.linkedin.com/in/muhindo-galien/" target='_blank'>
              <h2 className='flex items-center cursor-pointer'>Deloped by: Muhindo Galien <AiFillLinkedin className='text-xl font-bold text-black'/></h2>
            </a>
          </div>
        </div>
    </div>
  )
}

export default About