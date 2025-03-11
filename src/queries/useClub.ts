import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosError } from "axios";
import { ClubResponse, StudentApplyResponse } from "src/types/club/club.type";
import { QUERY_KEYS } from "./queryKey";
import clubApi from "src/api/Club/club.api";

export const useGetClubsQuery = (
  options?: UseQueryOptions<
    ClubResponse[], 
    AxiosError
  >
): UseQueryResult<ClubResponse[], AxiosError> =>
  useQuery<ClubResponse[], AxiosError>(QUERY_KEYS.clubs.getAll, () => clubApi.getClubs(), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
    suspense: true
  });

export const useGetClubDetailQuery = (
  id: number,
  options?: UseQueryOptions<
    ClubResponse, 
    AxiosError
  >
): UseQueryResult<ClubResponse, AxiosError> =>
  useQuery<ClubResponse, AxiosError>([QUERY_KEYS.clubs.getOne, id], () => clubApi.getClub(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
    suspense: true
  });

export const useGetMyClubApplyQuery = (
  options?: UseQueryOptions<
    ClubResponse[], 
    AxiosError
  >
): UseQueryResult<ClubResponse[], AxiosError> =>
  useQuery<ClubResponse[], AxiosError>(QUERY_KEYS.clubs.getMine, () => clubApi.getMyClubApply(), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
    suspense: true
  });

export const useGetStudentApplyQuery = (
  options?: UseQueryOptions<
    StudentApplyResponse[], 
    AxiosError
  >
): UseQueryResult<StudentApplyResponse[],  AxiosError> =>
  useQuery<StudentApplyResponse[], AxiosError>(QUERY_KEYS.clubs.getStudentApply, () => clubApi.getStudentApply(), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
    suspense: true
  });

export const useGetMyJoinedClubQuery = (
  options?: UseQueryOptions<
    ClubResponse[], 
    AxiosError
  >
): UseQueryResult<ClubResponse[], AxiosError> =>
  useQuery<ClubResponse[], AxiosError>(QUERY_KEYS.clubs.getJoinedClub, () => clubApi.getMyJoinedClubs(), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
    suspense: true
  });