import { useState, useEffect, useCallback } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContract } from './useContract';
import { ContractKit } from '@celo/contractkit';
import { toWei } from 'web3-utils';
import { setAlert, setGlobalState, setLoadingMsg } from '@/store';
import { structuredEvent } from './useReadAllEvent';
import { fromWei } from 'web3-utils';
import { toast } from 'react-hot-toast';

export const buyTicket = async (
  eventId,
  category,
  ticketPrice,
  yobookingContract,
  address
) => {
  ticketPrice = toWei(ticketPrice.toString(), 'ether');

  try {
    setLoadingMsg('Purchase ticket');
    await yobookingContract.methods
      .buyTicket(eventId, category)
      .send({ from: address, value: ticketPrice });
    setAlert('Ticket bought successfully', 'green');
  } catch (error) {
    setAlert('Purchase failed!', 'red');
    console.error('Purchase failed', { error });
  }
};

export const getMyEvents = async (yobookingContract, address) => {
  if (address) {
    try {
      // create an empty array that will contain every event added
      const allMyEvents = [];
      // assign the myEventCount to the variable counter
      setGlobalState('loaddata',{ show: true, msg: 'loading events', color: '' })
      const counter = await yobookingContract.methods
        .myEventCount(address)
        .call();

      for (let i = 0; i < counter; i++) {
        const singleEvent = await yobookingContract.methods
          .myEvents(address, i + 1)
          .call();
        allMyEvents.push(singleEvent);
      }
      setGlobalState('myEvents', structuredEvent(allMyEvents));
      setGlobalState('loaddata',{ show: false, msg: '', color: '' })
    } catch (error) {
      console.log(error);
    }
  }
};

const structuredTicket = (tickets) => {
  return tickets
    .map((item) => ({
      orderedAt: item.timestamp,
      ticket: {
        category: item.ticket.category,
        eventDate: item.ticket.eventDate,
        eventId: item.ticket.eventId,
        eventTitle: item.ticket.eventName,
        ticketId: item.ticket.ticketId,
        sold: item.ticket.isSold,
        eventVenue: item.ticket.eventVenue,
        ticketPrice: fromWei(item.ticket.price, 'ether'),
        orderedAt: item.ticket.timestamp,
      },
    }))
    .reverse();
};

export const getMyTickets = async (yobookingContract, address) => {
  if (address)
    try {
      // create an empty array that will contain every ticket purchased
      const allMyTickets = [];
      // assign the orderCount to the variable counter
      setGlobalState('loaddata',{ show: true, msg: 'loading tickets', color: '' })
      const counter = await yobookingContract.methods
        .orderCount(address)
        .call();

      for (let i = 0; i < counter; i++) {
        const ticket = await yobookingContract.methods
          .myOrders(address, i + 1)
          .call();
        allMyTickets.push(ticket);
      }
      setGlobalState('myTickets', structuredTicket(allMyTickets));
      setGlobalState('loaddata',{ show: false, msg: '', color: '' })

      return structuredTicket(allMyTickets);
    } catch (error) {
      console.log('error', error);
    }
};

export const writeEvent = async (
  yobookingContract,
  address,
  numVipTickets,
  numSilverTickets,
  vipTicketPrice,
  silverTicketPrice,
  title,
  eventDate,
  eventVenue
) => {
  try {
    if (address) {
      vipTicketPrice = toWei(vipTicketPrice.toString(), 'ether');
      silverTicketPrice = toWei(silverTicketPrice.toString(), 'ether');
      numVipTickets = Number(numVipTickets);
      numSilverTickets = Number(numSilverTickets);
      setLoadingMsg('Add event');

      const created = await yobookingContract.methods
        .addEvent(
          numVipTickets,
          numSilverTickets,
          vipTicketPrice,
          silverTicketPrice,
          title,
          eventDate,
          eventVenue
        )
        .send({ from: address });
      if (created) {
        setAlert('Event Added successfully', 'white');
        window.location.reload();
      }
    }
  } catch (error) {
    setAlert('Proccess failed', 'red');
    console.log(error);
  }
};
