import { useMutation, useQueryClient } from "react-query";
import clubApi from "src/api/Club/club.api";
import { QUERY_KEYS } from "../queryKey";
import { useNavigate } from "react-router-dom";

export const usePostClubApplyMutation = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const mutation = useMutation({
    mutationFn: (id:number) =>
    clubApi.postClubApply(id),
    onSuccess: () =>{
      queryClient.invalidateQueries([QUERY_KEYS.clubs.getMine])
      nav('/')
    }
  });
  return mutation;
}

export const useDeleteClubApplyMutation = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const mutation = useMutation({
    mutationFn: (id:number) =>
    clubApi.deleteClubApply(id),
    onSuccess: () =>{
      queryClient.invalidateQueries([QUERY_KEYS.clubs.getMine, QUERY_KEYS.clubs.getAll])
      nav('/')
    }
  });
  return mutation;
}