import { useGetMyClubApplyQuery } from 'src/queries/useClub'

export const useGetMyClubApply = () => {
  const { data: myClubApply, isLoading: clubIsLoading } = useGetMyClubApplyQuery()
  return {
    myClubApply,
    clubIsLoading
  }
}
