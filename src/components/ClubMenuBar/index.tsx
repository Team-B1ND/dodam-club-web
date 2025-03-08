import { DodamFilledButton, DodamModal } from '@b1nd/dds-web'
import ClubMenu from './ClubMenu'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGetTime } from 'src/queries/time/time.query'
import ClubMemberManager from '@components/ClubMemberManager'
import { useState } from 'react'
import { useGetMyClubApplyQuery } from 'src/queries/useClub'
import { EClub } from 'src/enum/club/club.enum'

const ClubMenuBar = () => {
  const { data:timeData, isLoading } = useGetTime();
  const { data: myClub, isLoading: clubIsLoading } = useGetMyClubApplyQuery()
  const date = new Date
  const today = date.toLocaleDateString().replace(/. /g, '-0').replace('.', '')
  const [ isOpen, setIsOpen ] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev)

  return (isLoading || clubIsLoading) ||
  timeData!.createEnd < today
  ? (
    <ClubMenubarContainer>
      <Link to={'/create'}>
        <DodamFilledButton
          size={"Large"}
          text="동아리 개설 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          customStyle={{minWidth:'180px'}}
        />
      </Link>
      <ClubMenu name="소속된 동아리" type="MyClub" time={timeData!}/>
      <ClubMenu name="내 개설 신청" type="LeaderApply" time={timeData!}/>
      <ClubMenu name="받은 부원 제안" type="Request" time={timeData!}/>
    </ClubMenubarContainer>
  )
  : (
    <ClubMenubarContainer>
      <Link to={'/register'}>
        <DodamFilledButton
          size={"Large"}
          text="동아리 입부 신청하기"
          textTheme="staticWhite"
          typography={["Body2", "Bold"]}
          customStyle={{minWidth:'180px'}}
        />
      </Link>
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
  flex-direction: column;
  gap: 16px;
  overflow-y: scroll;
  padding: 58px 0;
  white-space: nowrap;
`