import ClubList from "src/components/ClubMain/ClubList";
import * as S from "./style";
import { useClubTime } from "src/hooks/club/useClubTime";
import dayjs from "dayjs";


const ClubMain = () => {
  const {timeData, today, timeIsLoading} = useClubTime()
  
  return (
    <S.ClubListContainer>
      <S.ClubListHead>동아리</S.ClubListHead>
      {timeIsLoading ? (
        <>loading....</>
      // ) : dayjs(today).isBefore(timeData!.applicantStart) ? (
      //   <S.ClubMessage>
      //     현재 동아리 개설 기간입니다.
      //   </S.ClubMessage>
      ) : (
        <ClubList/>
      )}
    </S.ClubListContainer>
  );
};

export default ClubMain;