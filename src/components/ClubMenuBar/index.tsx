import ClubMenu from './ClubMenu'
import styled from 'styled-components'
import { Suspense } from 'react'
import { useClubTime } from 'src/hooks/club/useClubTime'
import ClubMenuSkeleton from '../Common/ClubMenuSkeleton'
import ClubInteractionButton from './ClubInteractionButton'

const ClubMenuBar = () => {
  const { timeData, today } = useClubTime();

  return (
    <ClubMenubarContainer>
      <Suspense fallback={<ClubInteractionButton type="LOADING"/>}>
        <ClubInteractionButton/>
      </Suspense>
      <Suspense fallback={<ClubMenuSkeleton/>}>
        <ClubMenu name="소속된 동아리" type="MyClub" timeData={timeData!}/>
      </Suspense>
      {(timeData!.createStart <= today && today <= timeData!.createEnd) ? (
        <>
          <Suspense fallback={<ClubMenuSkeleton/>}>
            <ClubMenu name="내 개설 신청" type="LeaderApply" timeData={timeData!}/>
          </Suspense>
          <Suspense fallback={<ClubMenuSkeleton/>}>
            <ClubMenu name="받은 부원 제안" type="Request" timeData={timeData!}/>
          </Suspense>
        </>
      ) : (
        <Suspense fallback={<ClubMenuSkeleton/>}>
          <ClubMenu name="내 신청" type="StudentApply" timeData={timeData!}/>
        </Suspense>
      )}
      <Suspense fallback={<ClubInteractionButton type="LOADING"/>}>
        <ClubInteractionButton type="MYCLUB"/>
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