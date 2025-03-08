import { useGetTime } from 'src/queries/time/time.query';

export const useClubTime = () => {
  const { data:timeData, isLoading:timeIsLoading } = useGetTime();
  const date = new Date
  const today = date.toLocaleDateString().replace(/. /g, '-0').replace('.', '')
  return {
    timeData,
    timeIsLoading,
    today
  }
}
