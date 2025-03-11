import { useMutation, useQueryClient } from 'react-query'
import clubApi from 'src/api/Club/club.api'
import { Club } from 'src/types/club/club.type'
import { QUERY_KEYS } from '../queryKey'
import { B1ndToast } from '@b1nd/b1nd-toastify'
import { useNavigate } from 'react-router-dom'
import { ClubErrorResponse } from 'src/types/response/response.type'
import { AxiosError } from 'axios'
import {
  patchClubParams,
  postMemberStatusParams,
} from 'src/api/Club/club.params'

export const useCreateClubMutation = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const mutation = useMutation({
    mutationFn: (data: Club) => clubApi.postClub(data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        QUERY_KEYS.clubs.getAll,
        QUERY_KEYS.clubs.getMine,
      ])
      nav('/')
    },
    onError: (error: ClubErrorResponse) => {
      if (error.code === 'CLUB_NAME_DUPLICATE') {
        B1ndToast.showError('이미 존재하는 동아리 이름입니다.')
      } else {
        B1ndToast.showError('동아리 생성에 실패했습니다.')
      }
    },
  })
  return mutation
}

export const usePatchClubMutation = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const mutation = useMutation({
    mutationFn: ({ data, id }: patchClubParams) =>
      clubApi.patchClub({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.clubs.getAll, QUERY_KEYS.clubApply.postClubApply],
      })
      nav('/')
    },
    onError: (error: AxiosError<ClubErrorResponse>) => {
      if (error.response) {
        B1ndToast.showError(`${error.response.data.message}`)
      }
    },
  })
  return mutation
}

export const usePostMemberStatusMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: postMemberStatusParams) =>
      clubApi.postMemberStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.clubsMember.getJoinRequestMember],
      })
    },
    onError: (error: AxiosError<ClubErrorResponse>) => {
      if (error.response) {
        B1ndToast.showError(`${error.response.data.message}`)
      }
    },
  })
  return mutation
}
