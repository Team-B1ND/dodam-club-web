import { useMutation, useQueryClient } from "react-query"
import clubApi from "src/api/Club/club.api"
import { Club } from "src/types/club/club.type"
import { QUERY_KEYS } from "../queryKey"
import { B1ndToast } from "@b1nd/b1nd-toastify"
import { useNavigate } from "react-router-dom"
import { ClubErrorResponse } from "src/types/response/response.type"
import { AxiosError } from "axios"
import { patchClubParams } from "src/api/Club/club.params"

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
      if(error.code == '400'){
        B1ndToast.showError(`error_${error.message} : 이름이 중복됩니다.`)
      }else{
        B1ndToast.showError(`error_${error.message} : 서버 오류`)
      }
    }
  })
  return mutation;
}

export const usePatchClubMutation = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const mutation = useMutation({
    mutationFn: ({data, id}: patchClubParams) => (
      clubApi.patchClub({data, id})
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.clubs.getAll, QUERY_KEYS.clubApply.postClubApply, ]})
      nav('/')
    },
    onError: (error : AxiosError<ClubErrorResponse>) => {
      if(error.response){
        B1ndToast.showError(`${error.response.data.message}`)
      }
    }
  })
  return mutation
}