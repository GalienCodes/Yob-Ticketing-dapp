'use-client';
import TicketCard from '@/components/cards/TicketCard';
import { getMyTickets } from '@/hooks/blockchain';
import { useContract } from '@/hooks/useContract';
import { useGlobalState } from '@/store';
import { useContractKit } from '@celo-tools/use-contractkit';
import React, { useEffect } from 'react';

const myTickets = () => {
  const contract = useContract();
  const { address } = useContractKit();

  useEffect(() => {
    const loadData = async () => {
      getMyTickets(contract, address)
    }
    loadData();
  }, [contract, address]);

  const [myTickets] = useGlobalState('myTickets');
  
  
  return (
    <div className='py-24 sm:py-28 max-w-4xl mx-auto text-gray-50'>
      <div className='pb-12 sm:pb-14 text-white'>
        <h2 className='font-semibold text-2xl text-center'>
          My tickets
        </h2>
      </div>
      <div className='mx-4 grid grid-cols-1  gap-2 sm:grid-cols-2 sm:gap-4'>
      {myTickets.length > 0 ? (
        myTickets?.map((item, i) => {
          const {
            category,
            eventDate,
            eventId,
            eventTitle,
            eventVenue,
            sold,
            ticketId,
            ticketPrice,
          } = item.ticket;
          return (
              <TicketCard
                orderedAt={item.orderedAt}
                category={category}
                eventDate={eventDate}
                sold={sold}
                eventVenue={eventVenue}
                eventId={eventId}
                eventTitle={eventTitle}
                ticketId={ticketId}
                ticketPrice={ticketPrice}
                key={i + 1}
              />
          );
        })
      ) : (
        <p className='font-bold text-center pt-5'>You don't have any yet!</p>
      )}
        
      </div>
    </div>
  );
};

export default myTickets;
