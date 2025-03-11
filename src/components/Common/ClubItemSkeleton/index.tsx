import styled from 'styled-components'
import Shimmer from '../Shimmer'

const ClubItemSkeleton = () => {
  return (
    <ClubItemContainer>
      <ClubItemImg>
        <Shimmer/>
      </ClubItemImg>
      <ClubItemInfo>
        <ClubItemLine>
          <Shimmer/>
        </ClubItemLine>
        <ClubItemLine>
          <Shimmer/>
        </ClubItemLine>
        <ClubItemLine>
          <Shimmer/>
        </ClubItemLine>
      </ClubItemInfo>
    </ClubItemContainer>
  )
}

export default ClubItemSkeleton

const ClubItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 220px;
  height: 280px;
  overflow: hidden;
`

const ClubItemImg = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
`

const ClubItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-grow: 1;
  gap: 4px;
`

const ClubItemLine = styled.div`
  width: 200px;
  height: 16px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`