import styled from 'styled-components'
import Shimmer from '../Shimmer'

const CreateClubSkeleton = () => {
  return (
    <CreateClubSkeletonContainer>
      {Array.from({ length: 5 }).map((_, idx) => (
        <CreateClubSkeletonInput key={idx}>
          <Shimmer/>
        </CreateClubSkeletonInput>
      ))}
      <CreateClubSkeletonDescription>
        <Shimmer/>
      </CreateClubSkeletonDescription>
      <CreateClubSkeletonMember>
        <Shimmer/>
      </CreateClubSkeletonMember>
    </CreateClubSkeletonContainer>
  )
}

export default CreateClubSkeleton

const CreateClubSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
`

const CreateClubSkeletonInput = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const CreateClubSkeletonDescription = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const CreateClubSkeletonMember = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`