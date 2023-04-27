'use client';
import TicketCard from '@/components/cards/TicketCard';
import { useSingleEvent } from '@/hooks/useSingleEvent';
import { displayData, minutesRemaining, useGlobalState } from '@/store';
import { log } from 'console';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const eventdetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const eventDetails = useSingleEvent(id);
  const [active, setActive] = useState(false);

  const avialableSilverTickets = eventDetails?.silverTickets;
  const avialableVipTickets = eventDetails?.vipTickets;

  const numAvSilverTickets = avialableSilverTickets?.filter(
    (item: { sold: boolean }) => item?.sold == false
  );
  const numSoldSilverTickets = avialableSilverTickets?.filter(
    (item: { sold: boolean }) => item?.sold == true
  );

  const numAvVipTickets = avialableVipTickets?.filter(
    (item: { sold: boolean }) => item?.sold == false
  );
  const numSoldVipTickets = avialableVipTickets?.filter(
    (item: { sold: boolean }) => item?.sold == true
  );
  const oneHour = new Date(
    new Date().setMinutes(
      new Date().getMinutes() -
        -minutesRemaining(eventDetails.sellingDuration).minutes
    )
  );

  return (
    <div className='py-24 sm:py-28 max-w-4xl mx-auto text-white'>
      <div className='mx-4'>
        <div className=' flex flex-col justify-center'>
          <div className='flex justify-between'>
            <h2 className=' font-semibold text-xl text-center'>
              {eventDetails?.eventTitle}
            </h2>
            <Countdown
              date={oneHour}
              renderer={({ minutes, seconds, completed }) => {
                if (completed) {
                  setActive(true);
                }
                return (
                  <h2 className=' font-semibold text-lg text-center'>
                    Event status:{' '}
                    <span className='p-1 rounded-2xl border font-medium'>
                      {completed ? 'Expired' : 'Active'}
                    </span>
                  </h2>
                );
              }}
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-2 sm-gap-4 '>
            <div className='w-full sm:w-3/6'>
              <div className='flex justify-between'>
                <h2 className=' font-semibold text-lg py-2'>Silver Tickets</h2>
              </div>
              <div className='flex justify-between gap-2 text-center bg-white text-gray-800 py-1.5 px-2 w-full rounded text-lg font-medium mb-3 capitalize'>
                <p>available {numAvSilverTickets?.length}</p>
                <p>Sold: {numSoldSilverTickets?.length}</p>
              </div>
              <div>
                <div className='grid grid-cols-1 gap-2'>
                  {avialableSilverTickets?.length > 0
                    ? avialableSilverTickets?.map(
                        (
                          item: {
                            category: any;
                            eventDate: any;
                            eventId: any;
                            eventTitle: any;
                            sold: any;
                            ticketId: any;
                            ticketPrice: any;
                          },
                          i: number
                        ) => {
                          const {
                            category,
                            eventDate,
                            eventId,
                            eventTitle,
                            sold,
                            ticketId,
                            ticketPrice,
                          } = item;
                          return (
                            <TicketCard
                              category={category}
                              eventDate={eventDate}
                              sold={sold}
                              eventVenue={
                                eventDetails && eventDetails?.eventVenue
                              }
                              eventId={id}
                              eventTitle={eventTitle}
                              ticketId={ticketId}
                              ticketPrice={ticketPrice}
                              completed={active}
                              eventOwner={eventDetails.eventOwner}
                              key={i + 1}
                            />
                          );
                        }
                      )
                    : null}
                </div>
              </div>
            </div>
            <div className='w-full sm:w-3/6'>
              <div className='flex justify-between'>
                <h2 className=' font-semibold text-lg py-2'>VIP Tickets</h2>
              </div>
              <div className='flex justify-between gap-2 text-center bg-white text-gray-800 py-1.5 px-2 w-full rounded text-lg font-medium mb-3 capitalize'>
                <p>available {numAvVipTickets?.length}</p>
                <p>Sold: {numSoldVipTickets?.length}</p>
              </div>
              <div>
                <div className='grid grid-cols-1 gap-2'>
                  {avialableVipTickets?.length > 0
                    ? avialableVipTickets?.map(
                        (
                          item: {
                            category: any;
                            eventDate: any;
                            eventId: any;
                            eventTitle: any;
                            sold: any;
                            ticketId: any;
                            ticketPrice: any;
                          },
                          i: number
                        ) => {
                          const {
                            category,
                            eventDate,
                            eventId,
                            eventTitle,
                            sold,
                            ticketId,
                            ticketPrice,
                          } = item;
                          return (
                            <TicketCard
                              category={category}
                              eventDate={eventDate}
                              sold={sold}
                              eventVenue={
                                eventDetails && eventDetails?.eventVenue
                              }
                              eventId={eventId}
                              eventTitle={eventTitle}
                              ticketId={ticketId}
                              ticketPrice={ticketPrice}
                              completed={active}
                              eventOwner={eventDetails.eventOwner}
                              key={i + 1}
                            />
                          );
                        }
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default eventdetails;
