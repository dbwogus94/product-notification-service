import { Request } from 'express';

export type AdminInfo = {
  id: string;
  admin: string;
  managerId: string;
  jwt: string;
};

export type AdminRequest = Request & { user: AdminInfo };
