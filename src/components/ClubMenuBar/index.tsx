import { DodamFilledButton } from '@b1nd/dds-web'
import ClubMenu from './ClubMenu'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ClubMenuBar = () => {
  
  // 일반 학생 상태일 때 신청한 동아리 표시 기능 필요

  return (
    <ClubMenubarContainer>
      <Link to={'/create'}>
        <DodamFilledButton
          size={"Large"}
          text="동아리 개설 신청하기"
          customStyle={{ color: "#fff", whiteSpace:'nowrap'}}
          typography={["Body2", "Bold"]}
        />
      </Link>
      <ClubMenu name="소속된 동아리" type="MyClub" />
      <ClubMenu name="내 개설 신청" type="LeaderApply" />
      <ClubMenu name="받은 부원 제안" type="Request" />
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