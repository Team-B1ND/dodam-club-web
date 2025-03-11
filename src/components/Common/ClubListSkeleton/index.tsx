import { DodamShape } from '@b1nd/dds-web'
import styled from 'styled-components'
import Shimmer from '../Shimmer'

const ClubListSkeleton = () => {
  return (
    <ClubListContainerSkeleton>
      <ClubListHeadSkeleton>
        <Shimmer/>
      </ClubListHeadSkeleton>
      <ClubListButtonSkeleton>
        <Shimmer/>
      </ClubListButtonSkeleton>
    </ClubListContainerSkeleton>
  )
}

export default ClubListSkeleton

const ClubListContainerSkeleton = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  ${DodamShape.Large};
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  gap: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ClubListHeadSkeleton = styled.div`
  width: 100px;
  height: 26px;
  ${DodamShape.ExtraSmall}
  overflow: hidden;
  position: relative;
`

const ClubListButtonSkeleton = styled.div`
  width: 40%;
  height: 54px;
  ${DodamShape.ExtraSmall}
  overflow: hidden;
  position: relative;
`