import * as S from "./style"
import { DodamFilledButton } from '@b1nd/dds-web'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGetMyJoinedClubQuery } from 'src/queries/useClub'
import { useClubTime } from 'src/hooks/club/useClubTime'
import dayjs from 'dayjs'
import MyClubManageMenu from "src/components/ClubMenuBar/ClubMenu/MyClubManageMenu"

const ClubMenuBar = () => {
  const navigate = useNavigate();
  const { timeData, timeIsLoading, today } = useClubTime();
  const { data: joinedClub, isLoading: joinedIsLoading } = useGetMyJoinedClubQuery()
  const [isOpen, setIsOpen] = useState(false);

  return (timeIsLoading || joinedIsLoading) ? (
    <S.ClubMenubarContainer>
      <S.ClubMenubarItem>loading...</S.ClubMenubarItem>
    </S.ClubMenubarContainer>
  ) : dayjs(today).isAfter(timeData!.applicantStart) ? (
    <S.ClubMenubarContainer>
      <MyClubManageMenu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
      />
      {joinedClub?.length === 0 ? (
        <DodamFilledButton
          size={"Large"}
          text="동아리 입부 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          onClick={() => navigate("/register")}
        />
      ) : (
        <S.ClubMenubarItem>
          <p>이미 소속된 <br/> 동아리가 존재해요!</p>
          <div>
            <span>{`소속 동아리: ${joinedClub?.[0].name}`}</span>
          </div>
        </S.ClubMenubarItem>
      )}
    </S.ClubMenubarContainer>
  ) : (
    <S.ClubMenubarContainer>
      <S.ClubMenubarItem>
        <p>
          동아리 입부 신청 <br /> 기간이 아닙니다.
        </p>
        <div>
          <span>시작: {timeData?.applicantStart.split("T").join(" ")}</span>
          <span>만료: {timeData?.applicantEnd.split("T").join(" ")}</span>
        </div>
      </S.ClubMenubarItem>
    </S.ClubMenubarContainer>
  );
}

export default ClubMenuBar

