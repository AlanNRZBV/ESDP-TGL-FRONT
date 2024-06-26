import { Region } from './types.Regions';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Pup } from './types.Pup';

export interface User {
  _id: string;
  email: string;
  pupID: Pup;
  marketId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  token: string;
  phoneNumber: string;
  region: Region;
  settlement: string;
  address: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  pupID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  region: string;
  settlement: string;
  address: string;
}

export interface UserNav {
  id: number;
  name: string;
  navLink: string;
  icon: ReactJSXElement;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface LoginLastSessionMutation {
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Staff {
  _id: string;
  email: string;
  password: string;
  pupID: Pup;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  region: Region;
  settlement: string;
  address: string;
  role: string;
}

export interface Client {
  _id: string;
  marketId: string;
  email: string;
  pupID: Pup;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  region: Region;
  settlement: string;
  address: string;
}
export interface ClientsResponse {
  message: string;
  clients: Client[];
}
export interface ClientResponse {
  message: string;
  client: Client;
}

export interface IStaff {
  email: string;
  password: string;
  pupID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  region: string;
  settlement: string;
  address: string;
  role: string;
}

export interface IUser {
  email: string | undefined;
  pupID: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
  phoneNumber: string | undefined;
  region: string | undefined;
  settlement: string | undefined;
  address: string | undefined;
}

export interface IStaffResponse {
  message: string;
  user: Staff;
}

export interface IUserResponse {
  message: string;
  user: User;
}

export interface IStaffResponseData {
  message: string;
  users: Staff[];
}

export interface UpdateUserArg {
  userId: string;
  userMutation: IStaff;
}

export interface UsersRequestParams {
  region?: string;
  settlement?: string;
  role?: string;
}
