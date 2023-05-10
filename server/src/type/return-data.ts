import { Error } from './error';

export type ReturnData<T> = {
  data: T | Error;
};
