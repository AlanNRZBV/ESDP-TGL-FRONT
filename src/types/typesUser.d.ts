export interface User {
  _id: string;
  email: string;
  marketId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  token: string;
  phoneNumber: string;
  region: string;
  settlement: string;
  address: string;
}

// Form mutations
export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  phoneNumber: string;
  region: string;
  settlement: string;
  address: string;
}

export interface UserNav {
  id: number;
  name: string;
  navLink: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

// Api responses
export interface RegisterResponse {
  user: User;
}