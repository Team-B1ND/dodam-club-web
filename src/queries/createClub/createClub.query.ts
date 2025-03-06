import { useMutation, useQueryClient } from "react-query"
import clubApi from "src/api/Club/club.api"
import { Club } from "src/types/club/club.type"
import { QUERY_KEYS } from "../queryKey"
import { B1ndToast } from "@b1nd/b1nd-toastify"

export const useCreateClubQuery = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data:Club) => 
      clubApi.postClub(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.clubs.getAll, QUERY_KEYS.clubApply.postClubApply]})
    },
    onError: (error) => {
      B1ndToast.showError(`${error}`)
    }
  })
  return mutation;
}