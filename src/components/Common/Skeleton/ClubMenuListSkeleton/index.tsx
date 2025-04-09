import { DodamColor, DodamShape } from '@b1nd/dds-web'
import styled from 'styled-components'
import Shimmer from '../Shimmer'
import ClubMenuSkeleton from '../ClubMenuSkeleton'

const ClubMenuListSkeleton = () => {
  return (
    <ClubMenuListSkeletonContainer>
      <ClubInteractionButtonSkeleton>
        <Shimmer/>
      </ClubInteractionButtonSkeleton>
      <ClubMenuSkeleton/>
      <ClubMenuSkeleton/>
    </ClubMenuListSkeletonContainer>
  )
}

export default ClubMenuListSkeleton

const ClubMenuListSkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ClubInteractionButtonSkeleton = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 48px;
  ${DodamShape.Medium};
  background-color: ${DodamColor.blue30};
`