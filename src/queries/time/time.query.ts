import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { QUERY_KEYS } from "../queryKey";
import { ClubTime, getTime } from "src/api/time/time.api";

export const useGetTime = (
  options?: UseQueryOptions<
    ClubTime, 
    AxiosError
  >
): UseQueryResult<ClubTime, AxiosError> =>
  useQuery<ClubTime, AxiosError>(QUERY_KEYS.time.time, () => getTime(), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
    suspense: true
  });