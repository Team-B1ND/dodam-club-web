import { DodamFilledButton, DodamModal } from '@b1nd/dds-web'
import ClubMenu from './ClubMenu'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ClubMemberManager from 'src/components/ClubMemberManager'
import { Suspense, useState } from 'react'
import { useClubTime } from 'src/hooks/club/useClubTime'
import ClubMenuSkeleton from '../Common/ClubMenuSkeleton'
import ClubResultChecker from '../ClubResultChecker'

const ClubMenuBar = () => {
  const navigate = useNavigate();
  const { timeData, today } = useClubTime();
  const [ isOpen, setIsOpen ] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev)

  return (timeData!.createStart <= today && today <= timeData!.createEnd)
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
      <Suspense fallback={<ClubMenuSkeleton/>}>
        <ClubMenu name="소속된 동아리" type="MyClub" time={timeData!}/>
        <ClubMenu name="내 개설 신청" type="LeaderApply" time={timeData!}/>
        <ClubMenu name="받은 부원 제안" type="Request" time={timeData!}/>
      </Suspense>
    </ClubMenubarContainer>
  )
  : (
    <ClubMenubarContainer>
      {timeData!.applicantEnd < today && (
        <Suspense fallback={
          <DodamFilledButton
            size={"Large"}
            text="결과 불러오는 중.."
            textTheme="staticWhite"
            typography={["Body2", "Bold"]}
            enabled={false}
          />
        }>
          <ClubResultChecker/>
        </Suspense>
      )}
      <DodamFilledButton
        size={"Large"}
        text="자율동아리 관리"
        textTheme="staticWhite"
        typography={["Body2", "Bold"]}
        onClick={handleOpen}
      />
      <DodamFilledButton
        size={"Large"}
        text="동아리 입부 신청하기"
        textTheme="staticWhite"
        typography={["Body2", "Bold"]}
        onClick={()=>navigate('/register')}
      />
      <Suspense fallback={Array.from({length:2}).map((_, idx) => <ClubMenuSkeleton key={idx}/> )}>
        <ClubMenu name="소속된 동아리" type="MyClub" time={timeData!}/>
        <ClubMenu name="내 신청" type="StudentApply" time={timeData!}/>
      </Suspense>
      <Suspense>
        <DodamModal
          isOpen={isOpen}
          background={true}
        >
          <ClubMemberManager close={handleOpen}/>
        </DodamModal>
      </Suspense>
    </ClubMenubarContainer>
  )
}

export default ClubMenuBar

const ClubMenubarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  flex-direction: column;
  gap: 16px;
  white-space: nowrap; 
  & a {
    text-decoration: none;
  }
`