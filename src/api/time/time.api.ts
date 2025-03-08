import customAxios from "src/libs/axios/customAxios"
import { baseResponse } from "src/types/response/response.type"

export interface ClubTime {
  createStart: string;
  createEnd: string;
  applicantStart: string;
  applicantEnd: string;
}

export const getTime = async () => {
  const { data } = await customAxios.get<baseResponse<ClubTime>>(`/clubs/time`)
  return data.data
}