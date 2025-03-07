import { useMutation, useQueryClient } from "react-query"
import clubApi from "src/api/Club/club.api"
import { Club } from "src/types/club/club.type"
import { QUERY_KEYS } from "../queryKey"
import { B1ndToast } from "@b1nd/b1nd-toastify"
import { useNavigate } from "react-router-dom"
import { ClubErrorResponse } from "src/types/response/response.type"

export const useCreateClubMutation = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const mutation = useMutation({
    mutationFn: (data:Club) => (
      clubApi.postClub(data)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.clubs.getAll, QUERY_KEYS.clubApply.postClubApply, ]})
      nav('/')
    },
    onError: (error : ClubErrorResponse) => {
      B1ndToast.showError(`error! ${error.message} : 이름이 중복됩니다.`)
    }
  })
  return mutation;
}