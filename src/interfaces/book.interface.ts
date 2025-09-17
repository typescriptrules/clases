export interface IBook {
    id: string;
    author: string;
    name: string;
    owner: string;
}

export interface IUser {
  id: string | number;
  name: string;
  role: string;
}