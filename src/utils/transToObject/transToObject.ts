import { ClubJoinResponse, ClubResponse } from 'src/types/club/club.type'

export const transToObject = (value: ClubJoinResponse[] | ClubResponse[]) => {
  return (
    Object.fromEntries(value.map((item) => [item.id, false])) as { [key: number]: boolean}
  )
}