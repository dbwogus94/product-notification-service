import { Request } from 'express';

export type UserInfo = {
  id: number;
  uid: string;
  kind: string;
  jwt: string;
};

export type UserRequest = Request & { user: UserInfo };
