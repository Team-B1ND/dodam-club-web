import { useGetJoinRequests } from "src/queries/joinRequest/useJoinRequest"

export const useJoinRequest = () => {
  const { data:joinRequestList, isLoading, refetch } = useGetJoinRequests()
  
  return {
    joinRequestList,
    isLoading,
    refetch
  }
}