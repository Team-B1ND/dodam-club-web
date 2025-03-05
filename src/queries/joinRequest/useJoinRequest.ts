import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from 'react-query';
import { ClubJoinResponse } from 'src/types/club/club.type';
import { QUERY_KEYS } from '../queryKey';
import clubApi from 'src/api/Club/club.api';

export const useGetJoinRequestsQuery = (
  options?: UseQueryOptions<
    ClubJoinResponse[], 
    AxiosError
  >
): UseQueryResult<ClubJoinResponse[], AxiosError> =>
  useQuery<ClubJoinResponse[], AxiosError>(QUERY_KEYS.joinRequest.getJoinRequests, () => clubApi.getJoinClubByRequest(), {
    ...options,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

export const usePostJoinRequestQuery = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id:{id:number}) =>
    clubApi.postJoinClubByRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [QUERY_KEYS.joinRequest.getJoinRequests]})
      console.log('sucess')
    }
  });
  return mutation;
}

export const useDeleteJoinRequestQuery = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id:{id:number}) =>
      clubApi.deleteJoinClubByRequest(id),
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey :[ QUERY_KEYS.joinRequest.getJoinRequests]})
      console.log('sucess')
    }
  });
  return mutation;
}