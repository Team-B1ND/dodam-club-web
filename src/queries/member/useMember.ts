import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosError } from "axios";
import { ClubMember } from "src/types/club/club.type";
import { QUERY_KEYS } from "../queryKey";
import clubApi from "src/api/Club/club.api";

export const useGetClubLeaderQuery = (
  { id }: { id: number },
  options?: UseQueryOptions<
    ClubMember, 
    AxiosError
  >
): UseQueryResult<ClubMember, AxiosError> =>
  useQuery<ClubMember, AxiosError>(QUERY_KEYS.clubsMember.getClubLeader, () => clubApi.getClubLeader(id), {
    ...options,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

export const useGetClubAllMemberQuery = (
  { id }: { id: number },
  options?: UseQueryOptions<
    ClubMember[], 
    AxiosError
  >
): UseQueryResult<ClubMember[], AxiosError> =>
  useQuery<ClubMember[], AxiosError>(QUERY_KEYS.clubsMember.getMemberAll, () => clubApi.getClubAllMember(id), {
    ...options,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

export const useGetClubMemberQuery = (
  { id }: { id: number },
  options?: UseQueryOptions<
    ClubMember[], 
    AxiosError
  >
): UseQueryResult<ClubMember[], AxiosError> =>
  useQuery<ClubMember[], AxiosError>(QUERY_KEYS.clubsMember.getMember, () => clubApi.getClubMember(id), {
    ...options,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });