import { useState, useEffect, useCallback } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContract } from './useContract';
import { fromWei } from 'web3-utils';

export const structuredEvent = (events: any|undefined[]) => {
  return events
    ?.map((item: { eventId: any; eventName: any; owner: string; numVipTickets: any; numSilverTickets: any; silverTicketPrice: string | import("bn.js"); vipTicketPrice: string | import("bn.js"); eventDate: any; sellingDuration: any; eventVenue: any; silverTickets: { category: string; eventDate?: number | undefined; eventName: string; isSold: boolean; ticketId: number; price: string; eventVenue: string; }[]; vipTickets: { category: string; eventDate?: number | undefined; eventName: string; isSold: boolean; ticketId: number; price: string; eventVenue: string; }[]; }) => ({
      eventId: item.eventId,
      eventName: item.eventName,
      owner: item.owner.toLowerCase(),
      numVipTickets: item.numVipTickets,
      numSilverTickets: item.numSilverTickets,
      silverTicketPrice: fromWei(item.silverTicketPrice, 'ether'),
      vipTicketPrice: fromWei(item.vipTicketPrice, 'ether'),
      eventDate: item.eventDate,
      sellingDuration: item.sellingDuration,
      // eventHost:item.eventHost,
      eventVenue: item.eventVenue,
      silverTickets: item.silverTickets?.map(
        (el: {
          category: string;
          eventDate?: number;
          eventName: string;
          isSold: boolean;
          ticketId: number;
          price: string;
          eventVenue: string;
        }) => ({
          category: el.category,
          eventId: item.eventId,
          eventDate: el.eventDate,
          eventName: el.eventName,
          isSold: el.isSold,
          ticketId: el.ticketId,
          ticketPrice: fromWei(el.price, 'ether'),
          eventVenue: el.eventVenue,
        })
      ),
      vipTickets: item.vipTickets?.map(
        (el: {
          category: string;
          eventDate?: number;
          eventName: string;
          isSold: boolean;
          ticketId: number;
          price: string;
          eventVenue: string;
        }) => ({
          category: el.category,
          eventId: item.eventId,
          eventDate: el.eventDate,
          eventName: el.eventName,
          isSold: el.isSold,
          ticketId: el.ticketId,
          ticketPrice: fromWei(el.price, 'ether'),
          eventVenue: el.eventVenue,
        })
      ),
    }))
    .reverse();
};

export const useReadAllEvents = () => {
  const { address } = useContractKit();
  const yobookingContract:any = useContract();
  const [events, setEvents] = useState();

  const getEvents = useCallback(async () => {
    if (!yobookingContract) return;
    // fetch all events
    const allEvents = await yobookingContract.methods.getAllEvents().call();
    setEvents(allEvents);
  }, [yobookingContract]);

  useEffect(() => {
    if (address) getEvents();
  }, [address, getEvents]);
  return structuredEvent(events);
};
