import { DodamShape } from '@b1nd/dds-web'
import styled from 'styled-components'
import Shimmer from '../Shimmer'

const ClubMenuListSkeleton = () => {
  return (
    <ClubMenuListSkeletonContainer>
      <Shimmer/>
    </ClubMenuListSkeletonContainer>
  )
}

export default ClubMenuListSkeleton

const ClubMenuListSkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  ${DodamShape.Large}
`