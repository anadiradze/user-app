export interface IUser {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
  email: string;
  ip: string;
  company: ICompany;
  address: IAddress;
}
interface IPagination {
  current: number;
  nextPage: number | null;
  pageSize: number;
  previousPage: number | null;
  total: number;
}
export interface IData {
  pagination: IPagination;
  list: IUsers[];
}
export interface ICompany {
  name: string;
  suffix: string;
}
export interface IAddress {
  zipCode: string;
  city: string;
  streetAddress: string;
  country: string;
  state: string;
}
export interface IUsers {
  id: string;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}
