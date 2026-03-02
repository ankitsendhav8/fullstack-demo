export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  access_token?: string;
  access_key?: string;
}
