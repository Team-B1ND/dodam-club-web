import { ClubStatus } from "src/types/club/club.type"
import * as S from "./style"
import { STUDENT_APPLY_STATUS_MAP } from "src/constants/clubStatus/clubStatus.constant"

interface StudentApplyStatusTextProps {
  status: ClubStatus
}
const StudentApplyStatusText = ({
  status
}: StudentApplyStatusTextProps) => {
  return (
    <S.TextContainer $status={status}>
      {STUDENT_APPLY_STATUS_MAP[status]}
    </S.TextContainer>    
  )
}

export default StudentApplyStatusText