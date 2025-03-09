import { Dialog, DodamDialog, DodamFilledButton, DodamModal } from '@b1nd/dds-web'
import ClubMenu from './ClubMenu'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useGetTime } from 'src/queries/time/time.query'
import ClubMemberManager from 'src/components/ClubMemberManager'
import { useState } from 'react'
import { useGetMyClubApplyQuery, useGetMyJoinedClubQuery } from 'src/queries/useClub'
import { EClub } from 'src/enum/club/club.enum'
import { useClubTime } from 'src/hooks/club/useClubTime'

const ClubMenuBar = () => {
  const navigate = useNavigate();
  const { data: myClub, isLoading: clubIsLoading } = useGetMyClubApplyQuery()
  const { timeData, timeIsLoading, today } = useClubTime();
  const { data: joinedClub, isLoading:joinedIsLoading } = useGetMyJoinedClubQuery()

  const [ resultIsOpen, setResultIsOpen ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev)

  return (timeIsLoading || clubIsLoading || joinedIsLoading) ||
  timeData!.createEnd < today
  ? (
    <ClubMenubarContainer>
        <DodamFilledButton
          size={"Large"}
          text="동아리 개설 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          customStyle={{minWidth:"50px"}}
          onClick={()=>navigate("/create")}
        />
      
      <ClubMenu name="소속된 동아리" type="MyClub" time={timeData!}/>
      <ClubMenu name="내 개설 신청" type="LeaderApply" time={timeData!}/>
      <ClubMenu name="받은 부원 제안" type="Request" time={timeData!}/>
    </ClubMenubarContainer>
  )
  : (
    <ClubMenubarContainer>
      {/* {timeData!.applicantEnd < today && ( */}
        <>
          <DodamFilledButton
            size={"Large"}
            text="결과 확인하기"
            textTheme="staticWhite"
            typography={["Body2", "Bold"]}
            onClick={() => setResultIsOpen(true)}
          />
          <DodamModal isOpen={resultIsOpen} background={true}>
            <Dialog
              title='동아리 입부를 축하합니다!'
              text={`창체동아리 ${joinedClub?.find((item) => item.type === EClub.CREATIVE_CLUB)?.name}에 입부하셨습니다.
              자율동아리 ${joinedClub?.filter((item) => item.type != EClub.CREATIVE_CLUB).map((item) => item.name)}에 입부하셨습니다.`}
              type={{
                dialog: "ALERT",
                close: {
                  content:'닫기',
                  onClick: () => setResultIsOpen(false)
                }
              }}
            />
          </DodamModal>
        </>
      {/* )} */}
        <DodamFilledButton
          size={"Large"}
          text="동아리 입부 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          customStyle={{minWidth:'180px'}}
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
          customStyle={{minWidth:'180px'}}
        />
      )}
      <DodamModal
        isOpen={isOpen}
        background={true}
      >
        <ClubMemberManager close={handleOpen} myClub={myClub!} isLoading={isLoading}/>
      </DodamModal>
    </ClubMenubarContainer>
  )
}

export default ClubMenuBar

const ClubMenubarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  white-space: nowrap; 
`