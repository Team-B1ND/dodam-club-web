import styled from 'styled-components'
import Shimmer from '../Shimmer'

const ClubDetailSkeleton = () => {
  return (
    <ClubDetailSkeletonContainer>
      <ClubDetailSkeletonLine>
        <ClubDetailSkeletonSmallLine>
          <Shimmer />
        </ClubDetailSkeletonSmallLine>
        <ClubDetailSkeletonBigLine>
          <Shimmer />
        </ClubDetailSkeletonBigLine>
        <ClubDetailSkeletonMediumLine>
          <Shimmer />
        </ClubDetailSkeletonMediumLine>
      </ClubDetailSkeletonLine>
      <ClubDetailSkeletonMain>
        <ClubDetailSkeletonMember>
          {Array.from({length:10}).map((_, idx) => <ClubDetailSkeletonMemberItem key={idx}><Shimmer/></ClubDetailSkeletonMemberItem>)}
        </ClubDetailSkeletonMember>
        <ClubDatailSkeletonDescription>
          <Shimmer/>
        </ClubDatailSkeletonDescription>
      </ClubDetailSkeletonMain>
    </ClubDetailSkeletonContainer>
  )
}

export default ClubDetailSkeleton

const ClubDetailSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  gap: 64px;
`
const ClubDetailSkeletonLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const ClubDetailSkeletonSmallLine = styled.div`
  width: 40%;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const ClubDetailSkeletonBigLine = styled.div`
  width: 60%;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const ClubDetailSkeletonMediumLine = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const ClubDetailSkeletonMain = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 600px;
  position: relative;
`

const ClubDetailSkeletonMember = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 200px;
  height: 100%;
  position: relative;
`

const ClubDetailSkeletonMemberItem = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const ClubDatailSkeletonDescription = styled.div`
  flex-grow: 1;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`