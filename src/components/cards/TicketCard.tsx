'use client';
import moment from 'moment';
import React from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
// import { purchaseTicket } from '../../sevices/Blockchain';
import { displayData } from '../../store';
import { useRouter } from 'next/router';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContract } from '@/hooks/useContract';
import { buyTicket } from '@/hooks/blockchain';



interface ITicketCard{
  category: string;
  eventDate?: number | undefined;
  eventTitle: string;
  sold: boolean;
  ticketId: number;
  ticketPrice: string;
  eventVenue: string;
  eventId: number;
  completed:boolean;
  eventOwner:string;
}

const TicketCard = ({
  category,
  eventDate,
  eventId,
  sold,
  eventVenue,
  eventTitle,
  ticketId,
  ticketPrice,
  completed,
  eventOwner,
}:ITicketCard) => {
  const router = useRouter();
  const { connect, address } = useContractKit();
  const yobookingContract = useContract();
  const checkOwner =
    address?.toLocaleLowerCase() == eventOwner?.toLocaleLowerCase();
  const handlePurchase = async () => {
    try {
      const purchase = await buyTicket(
        eventId,
        category,
        ticketPrice,
        yobookingContract,
        address
      );

      router.push('/myTickets');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className='bg-[#2db369] shadow-md rounded  text-white'>
      <div className='flex gap-4 h-40'>
        <div className='flex flex-col gap-2 w-5/12  sm:w-2/5  bg-[#000] justify-center items-center'>
          <FaTicketAlt className='text-5xl' />
          <h4 className='text-sm font-semibold'>
            {category && category} Ticket
          </h4>
        </div>
        <div className=' flex flex-col pb-2 gap-0.5 w-7/12 sm:w-3/5 justify-center'>
          <div className='flex justify-between items-center'>
            <h2 className=' font-semibold text-lg py-0'>
              {eventTitle && eventTitle}
            </h2>
            <p className='mr-4 font-bold'>#{ticketId}</p>
          </div>
          <h2 className='text-sm font-medium'>
            {' '}
            Ticket price{' '}
            <span className='font-bold'>{ticketPrice && ticketPrice} CELO</span>
          </h2>
          <h2 className='text-sm font-medium'>
            Event Date{' '}
            <span className='font-semibold bg-[#fff] px-2 py-1 rounded-xl text-gray-800'>
              {displayData(eventDate && eventDate)}
            </span>
          </h2>
          <h2 className='text-sm font-medium flex items-center'>
            Venue: <HiOutlineLocationMarker className='mx-1' />
            <span className='font-bold'> {eventVenue && eventVenue}</span>
          </h2>
          {completed && !sold ? (
            <button
              type='button'
              className='w-40 bg-[#fff] text-gray-800 text-base py-1.5 px-2 rounded-2xl shadow-xl font-semibold'
              disabled
            >
              Not selling
            </button>
          ) : sold && sold ? null : (
            <>
              {checkOwner ? null : (
                <button
                  type='button'
                  className='w-40 bg-[#fff] text-gray-800 text-base py-1.5 px-2 rounded-2xl hover:bg-gray-100 hover:border-none shadow-xl font-semibold'
                  onClick={handlePurchase}
                >
                  Book now
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
