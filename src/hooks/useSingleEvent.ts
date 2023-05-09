import { useState, useEffect, useCallback } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContract } from './useContract';
import { fromWei } from 'web3-utils';

export const useSingleEvent = (id: string | string[] | undefined) => {
  const { address } = useContractKit();
  const yobookingContract = useContract();
  const [myEvent, setMyEvent] = useState();

  const getEvents = useCallback(async () => {
    if (!yobookingContract) return;
    // fetch an event
    //@ts-ignore
    setMyEvent(await yobookingContract.methods.getEvent(id).call());
  }, [yobookingContract]);

  useEffect(() => {
    if (address) getEvents();
  }, [address, getEvents]);

  const singleEventData = {
    //@ts-ignore
    sellingDuration: myEvent?.sellingDuration,
    //@ts-ignore
    eventId: myEvent?.eventId,
    //@ts-ignore
    eventTitle: myEvent?.eventName,
    //@ts-ignore
    eventOwner: myEvent?.eventOwner,
    //@ts-ignore
    numVipTickets: myEvent?.numVipTickets,
    //@ts-ignore
    numSilverTickets: myEvent?.numSilverTickets,
    //@ts-ignore
    eventDate: myEvent?.eventDate,
    //@ts-ignore
    eventVenue: myEvent?._eventVenue,
    //@ts-ignore
    silverTickets: myEvent?.silverTickets?.map((el:any) => ({
      category: el.category,
      eventDate: el.eventDate,
      eventId: el.eventId,
      eventTitle: el.eventName,
      ticketId: el.ticketId,
      sold: el.isSold,
      ticketPrice: fromWei(el.price,'ether'),
      eventVenue: el.eventVenue
    })),
    //@ts-ignore
    vipTickets: myEvent?.vipTickets?.map((el:any) => ({
      category: el.category,
      eventDate: el.eventDate,
      eventId: el.eventId,
      eventTitle: el.eventName,
      ticketId: el.ticketId,
      sold: el.isSold,
      ticketPrice:  fromWei(el.price,'ether'),
      eventVenue: el.eventVenue

    })),
  };
  return singleEventData;
};
