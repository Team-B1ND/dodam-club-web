import React from 'react'
import * as S from './style'
import Avatar from '@components/Common/Avatar'
import { CheckmarkCircleFilled, CheckmarkCircleLine } from '@b1nd/dds-web';
import { useTheme } from 'styled-components';
import { MemberStudent } from 'src/types/member/member.type';

interface MemberItemProps {
  value: MemberStudent;
  type: 'PICKER' | 'STATUS';
  pickerStatus?: boolean;
  status?: string;
  onClick: (studentId:number) => void;
}

const MemberItem = ({value, type, pickerStatus, onClick}: MemberItemProps ) => {
  const { profileImage, name, student } = value
  const theme = useTheme()

  return (
    <S.MemberItemContainer
      onClick={() => onClick(student.id)}
    >
      {!profileImage
      ? <Avatar size={30}/>
      : <img src={profileImage} alt='asdfas'/>}
      <S.MemberInfoContainer>
        {name}
        <S.MemberGradeAndRoom>
          {student?.grade}-{student?.room}
        </S.MemberGradeAndRoom> 
      </S.MemberInfoContainer>
      <S.MemberItemBar/>
      {type === 'PICKER' 
      ? pickerStatus 
        ? <CheckmarkCircleFilled color={theme.primaryNormal}/>
        : <CheckmarkCircleLine color={theme.lineNormal}/>
      : <CheckmarkCircleLine />} 
    </S.MemberItemContainer>
  )
}

export default MemberItem