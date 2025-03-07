export interface baseResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ClubErrorResponse {
  status: number;
  message: string;
  code: string;
}
