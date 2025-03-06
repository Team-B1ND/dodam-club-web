import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosError } from "axios";
import { ClubMember, ClubMemberResponse } from "src/types/club/club.type";
import { QUERY_KEYS } from "../queryKey";
import clubApi from "src/api/Club/club.api";
import { Student } from "src/types/member/member.type";

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

export const useGetAllMemberQuery = (
  { isSelf }: { isSelf: boolean },
  options?: UseQueryOptions<
    Student[], 
    AxiosError
  >
): UseQueryResult<Student[], AxiosError> =>
  useQuery<Student[], AxiosError>(QUERY_KEYS.clubsMember.getMemberAll, () => clubApi.getMembers(isSelf), {
    ...options,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

export const useGetClubMemberQuery = (
  { id }: { id: number },
  options?: UseQueryOptions<
    ClubMemberResponse, 
    AxiosError
  >
): UseQueryResult<ClubMemberResponse, AxiosError> =>
  useQuery<ClubMemberResponse, AxiosError>(QUERY_KEYS.clubsMember.getMember, () => clubApi.getClubMembers(id), {
    ...options,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });