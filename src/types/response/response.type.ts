export interface baseResponse<T> {
  status: number;
  message: string;
  data: T
}

