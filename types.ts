export interface IMentor {
  id: string;
  name: string;
  resume: string;
  avatar_url: string;
  bio: string;
  times: ITime[];
  hourly_cost: number;
  categories: string[];
}

export interface IMentorFull extends IMentor {
  is_mentor: true;
  phone: string;
  email: string;
  bank_no: string | null;
}

export interface ITime {
  date: string;
  duration: number; // in minutes
  reserved: boolean;
}

export interface IUser {
  is_mentor: false;
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string;
}

export interface IUserFull extends IUser {
  phone: string | null;
  email: string | null;
}
