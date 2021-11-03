export interface IMentor {
  id: string;
  name: string;
  resume: string;
  avatar_url: string;
  bio: string;
  times: ITime[];
  hourly_cost: number;
}

export interface ITime {
  id: string;
  start_date: string;
  reserved: boolean;
}
