import * as S from './style'
import { Avatar, Clock } from '@b1nd/dds-web';
import { CheckmarkCircleFilled, CheckmarkCircleLine, DodamColor, XmarkCircle } from '@b1nd/dds-web';
import { useTheme } from 'styled-components';
import { ClubMember } from 'src/types/club/club.type';
import { Student } from 'src/types/member/member.type';
import { EClubState } from 'src/enum/club/club.enum';

interface MemberItemProps {
  value: ClubMember | Student;
  type: "PICKER" | "STATUS" | "LIST";
  pickerStatus?: boolean;
  isManagerPage? : boolean;
  onClick?: ((studentId:number) => void);
}

const MemberItem = ({value, type, pickerStatus, onClick, isManagerPage}: MemberItemProps ) => {
  const { profileImage, name, id, grade, room, status, studentId } = value
  const theme = useTheme()

  return (
    <S.MemberItemContainer >
      <div style={{display:'flex', gap:'12px'}}>
        {!profileImage
        ? <Avatar size='large'/>
        : <S.MemberItemProfileImage src={profileImage} alt='X'/>}
        <S.MemberInfoContainer>
          {name}
          <p>{grade}-{room}</p>
        </S.MemberInfoContainer>
      </div>
      {onClick && type === 'PICKER'
      ? (
        <div
          onClick={() => onClick(isManagerPage ? studentId : id)}
          style={{ cursor:'pointer' }}
        >
          {pickerStatus
          ? <CheckmarkCircleFilled color={theme.primaryNormal}/>
          : <CheckmarkCircleLine color={theme.lineNormal}/>} 
        </div>)
      : type === "STATUS" 
      && (
        <div>
          {status == EClubState.ALLOWED
          ? <CheckmarkCircleFilled color={DodamColor.green50}/>
          : status === EClubState.REJECTED
            ? <XmarkCircle color={DodamColor.red50}/>
            : <Clock color={DodamColor.yellow50}/>}
        </div>
      )}
    </S.MemberItemContainer>
  )
}

export default MemberItem