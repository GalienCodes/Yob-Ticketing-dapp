import { useState, useEffect, useCallback } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContract } from './useContract';
import { fromWei } from 'web3-utils';
import BN from 'bn.js'

export const useSingleEvent = (id: string | string[] | undefined) => {
  const { address } = useContractKit();
  const yobookingContract = useContract();
  const [myEvent, setMyEvent] = useState();

  const getEvents = useCallback(async () => {
    if (!yobookingContract) return;
    // fetch an event
    setMyEvent(await yobookingContract.methods.getEvent(id).call());
  }, [yobookingContract]);

  useEffect(() => {
    if (address) getEvents();
  }, [address, getEvents]);

  const singleEventData = {
    sellingDuration: myEvent?.sellingDuration,
    eventId: myEvent?.eventId,
    eventTitle: myEvent?.eventName,
    eventOwner: myEvent?.eventOwner,
    numVipTickets: myEvent?.numVipTickets,
    numSilverTickets: myEvent?.numSilverTickets,
    // silverTicketPrice: myEvent?.silverTicketPrice,
    // vipTicketPrice: myEvent?.vipTicketPrice,
    eventDate: myEvent?.eventDate,
    eventVenue: myEvent?._eventVenue,
    silverTickets: myEvent?.silverTickets?.map((el) => ({
      category: el.category,
      eventDate: el.eventDate,
      eventId: el.eventId,
      eventTitle: el.eventName,
      ticketId: el.ticketId,
      sold: el.isSold,
      ticketPrice: fromWei(el.price,'ether'),
      eventVenue: el.eventVenue
    })),
    vipTickets: myEvent?.vipTickets?.map((el) => ({
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
