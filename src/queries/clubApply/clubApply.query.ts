import { useMutation, useQueryClient } from "react-query";
import clubApi from "src/api/Club/club.api";
import { QUERY_KEYS } from "../queryKey";

export const usePostClubApplyMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id:number) =>
    clubApi.postClubApply(id),
    onSuccess: () =>{
      queryClient.invalidateQueries([QUERY_KEYS.clubs.getMine])
    }
  });
  return mutation;
}

export const useDeleteClubApplyMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id:number) =>
    clubApi.deleteClubApply(id),
    onSuccess: () =>{
      queryClient.invalidateQueries([QUERY_KEYS.clubs.getMine])
    }
  });
  return mutation;
}
