import { DodamShape } from "@b1nd/dds-web"
import styled from "styled-components"
import Shimmer from "../Shimmer"

const ClubMenuSkeleton = () => {
  return (
    <ClubMenuSkeletonContainer>
      <ClubMenuSkeletonHeader>
        <Shimmer/>
      </ClubMenuSkeletonHeader>
      <ClubMenuSkeletonLineContainer>

      </ClubMenuSkeletonLineContainer>
      {Array.from({length: 2}).map((_, idx) => 
        <ClubMenuSkeletonLine key={idx}>
          <Shimmer/>
        </ClubMenuSkeletonLine>
      )}
    </ClubMenuSkeletonContainer>
  )
}

export default ClubMenuSkeleton

const ClubMenuSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${DodamShape.Large}
  background-color: ${({ theme }) => theme.backgroundNormal};
  padding: 16px;
  gap: 12px;
  height: fit-content;
`

const ClubMenuSkeletonHeader = styled.div`
  width: 100%;
  height: 38px;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
`

const ClubMenuSkeletonLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ClubMenuSkeletonLine = styled.div`
  width: 100%;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`