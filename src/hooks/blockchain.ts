import { toWei } from 'web3-utils';
import { setAlert, setGlobalState, setLoadingMsg } from '@/store';
import { structuredEvent } from './useReadAllEvent';
import { fromWei } from 'web3-utils';

export const buyTicket = async (
  eventId: number,
  category: string,
  ticketPrice: string | import("bn.js"),
  yobookingContract: any | undefined,
  address: string | null
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

export const getMyEvents = async (yobookingContract: any | undefined, address: string | null) => {
  if (address) {
    try {
      // create an empty array that will contain every event added
      const allMyEvents = [];
      // assign the myEventCount to the variable counter
      setGlobalState('loaddata',{ show: true, msg: 'loading events', color: '' })
      const counter = await yobookingContract?.methods
        .myEventCount(address)
        .call();

      for (let i = 0; i < counter; i++) {
        const singleEvent = await yobookingContract?.methods
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

const structuredTicket = (tickets: any[]) => {
  return tickets
    .map((item: { ticket: { category: any; eventDate: any; eventId: any; eventName: string| any; ticketId: any; isSold: boolean|any; eventVenue: any ;price: any | import("bn.js"); }; }) => ({
      ticket: {
        category: item.ticket.category,
        eventDate: item.ticket.eventDate,
        eventId: item.ticket.eventId,
        eventTitle: item.ticket.eventName,
        ticketId: item.ticket.ticketId,
        sold: item.ticket.isSold,
        eventVenue: item.ticket.eventVenue,
        ticketPrice: fromWei(item.ticket.price, 'ether'),
      },
    }))
    .reverse();
};

export const getMyTickets = async (yobookingContract: any | undefined, address: string | null) => {
  if (address)
    try {
      // create an empty array that will contain every ticket purchased
      const allMyTickets = [];
      // assign the orderCount to the variable counter
      setGlobalState('loaddata',{ show: true, msg: 'loading tickets', color: '' })
      const counter = await yobookingContract?.methods
        .orderCount(address)
        .call();

      for (let i = 0; i < counter; i++) {
        const ticket = await yobookingContract.methods
          .myOrders(address, i + 1)
          .call();
        allMyTickets.push(ticket);
      }


      //@ts-ignore
      setGlobalState('myTickets', structuredTicket(allMyTickets));

      setGlobalState('loaddata',{ show: false, msg: '', color: '' })

      return structuredTicket(allMyTickets);
    } catch (error) {
      console.log('error', error);
    }
};

export const writeEvent = async (
  yobookingContract: any | undefined,
  address: string | null,
  numVipTickets: string | number,
  numSilverTickets: string | number,
  vipTicketPrice: string | import("bn.js"),
  silverTicketPrice: string | import("bn.js"),
  title: string,
  eventDate: number,
  eventVenue: string
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
