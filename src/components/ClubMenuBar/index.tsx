import { DodamFilledButton, DodamModal } from '@b1nd/dds-web'
import ClubMenu from './ClubMenu'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useGetTime } from 'src/queries/time/time.query'
import ClubMemberManager from 'src/components/ClubMemberManager'
import { useState } from 'react'
import { useGetMyClubApplyQuery } from 'src/queries/useClub'
import { EClub } from 'src/enum/club/club.enum'
import { useClubTime } from 'src/hooks/club/useClubTime'

const ClubMenuBar = () => {
  const navigate = useNavigate();
  const { data: myClub, isLoading: clubIsLoading } = useGetMyClubApplyQuery()
  const { timeData, timeIsLoading, today } = useClubTime()

  const [ isOpen, setIsOpen ] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev)

  return (timeIsLoading || clubIsLoading) ||
  timeData!.applicantStart < today
  ? (
    <ClubMenubarContainer>
        <DodamFilledButton
          size={"Large"}
          text="동아리 개설 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          onClick={()=>navigate("/create")}
        />
      
      <ClubMenu name="소속된 동아리" type="MyClub" time={timeData!}/>
      <ClubMenu name="내 개설 신청" type="LeaderApply" time={timeData!}/>
      <ClubMenu name="받은 부원 제안" type="Request" time={timeData!}/>
    </ClubMenubarContainer>
  )
  : (
    <ClubMenubarContainer>
      
        <DodamFilledButton
          size={"Large"}
          text="동아리 입부 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          onClick={()=>navigate('/register')}
        />
      
      <ClubMenu name="소속된 동아리" type="MyClub" time={timeData!}/>
      <ClubMenu name="내 신청" type="StudentApply" time={timeData!}/>
      {(myClub!.filter((item) => item.type === EClub.SELF_DIRECT_CLUB).length > 0)
      && (  
        <DodamFilledButton
          size={"Large"}
          text="자율동아리 관리"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          onClick={handleOpen}
        />
      )}
      <DodamModal
        isOpen={isOpen}
        background={true}
      >
        <ClubMemberManager close={handleOpen} myClub={myClub!} isLoading={timeIsLoading}/>
      </DodamModal>
    </ClubMenubarContainer>
  )
}

export default ClubMenuBar

const ClubMenubarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 14vw;
  gap: 16px;
  overflow-y: scroll;
  padding: 58px 32px 0 0 ;
  white-space: nowrap;
  overflow-x: hidden;
`