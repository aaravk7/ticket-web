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
