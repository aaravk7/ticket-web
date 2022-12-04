export interface IEvent {
  _id: string;
  slug: string;
  name: string;
  poster: string;
  startDate: Date;
  endDate: Date;
}

export interface IEventDetails extends IEvent {
  description: string;
}

export interface ITicket {
  _id: string;
  event: string;
  date: Date;
  description: string;
  price: number;
  availableQuantity: number;
}

export enum OrderStatus {
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export interface IOrder {
  _id: string;
  eventData: {
    name: string;
  };
  ticketData: {
    date: Date;
    description: string;
  };
  totalPrice: number;
  status: OrderStatus;
}
