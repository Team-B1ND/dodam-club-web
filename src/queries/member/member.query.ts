
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosError } from "axios";
import { ClubJoinRequest, ClubMember, ClubMemberResponse } from "src/types/club/club.type";
import { QUERY_KEYS } from "../queryKey";
import clubApi from "src/api/Club/club.api";
import { Student } from "src/types/member/member.type";

export const useGetClubLeaderQuery = (
  id:number,
  options?: UseQueryOptions<
    ClubMember, 
    AxiosError
  >
): UseQueryResult<ClubMember, AxiosError> =>
  useQuery<ClubMember, AxiosError>([QUERY_KEYS.clubsMember.getClubLeader, id], () => clubApi.getClubLeader(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
  });

export const useGetAllMemberQuery = (
  { isSelf }: { isSelf: boolean },
  options?: UseQueryOptions<
    Student[], 
    AxiosError
  >
): UseQueryResult<Student[], AxiosError> =>
  useQuery<Student[], AxiosError>(QUERY_KEYS.clubsMember.getMemberAll, () => clubApi.getMembers(isSelf), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
  });

export const useGetClubMemberQuery = (
  id: number,
  options?: UseQueryOptions<
    ClubMemberResponse, 
    AxiosError
  >
): UseQueryResult<ClubMemberResponse, AxiosError> =>
  useQuery<ClubMemberResponse, AxiosError>([QUERY_KEYS.clubsMember.getMember, id], () => clubApi.getClubMembers(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
  });

export const useGetClubJoinRequestsMemberQuery = (
  id: number,
  options?: UseQueryOptions<
    ClubJoinRequest[], 
    AxiosError
  >
): UseQueryResult<ClubJoinRequest[], AxiosError> =>
  useQuery<ClubJoinRequest[], AxiosError>([QUERY_KEYS.clubsMember.getJoinRequestMember, id], () => clubApi.getOthersJoinRequests(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    ...options,
  });
