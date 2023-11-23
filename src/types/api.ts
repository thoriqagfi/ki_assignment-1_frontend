export type ApiReturn<T> = {
  status: string;
  message: string;
  data: T;
}