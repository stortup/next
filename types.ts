export interface IMentor {
  id: string;
  name: string;
  resume: string;
  bio: string;
  times: ITime[];
  hourly_cost: number;
  categories: string[];
  avatar_url: string | null;
}

export interface IMentorFull extends IMentor {
  is_mentor: true;
  is_admin: boolean;
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
  email?: string;
  phone?: string;
  avatar_url: string;
}

export interface IUserFull extends IUser {
  is_admin: boolean;
  phone?: string;
  email?: string;
}
