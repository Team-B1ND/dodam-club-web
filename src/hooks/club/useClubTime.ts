import { useGetTime } from 'src/queries/time/time.query'
import dayjs from 'dayjs'

export const useClubTime = () => {
  const { data: timeData, isLoading: timeIsLoading } = useGetTime()

  const today = dayjs().format('YYYY-MM-DD')
  return {
    timeData,
    timeIsLoading,
    today,
  }
}
