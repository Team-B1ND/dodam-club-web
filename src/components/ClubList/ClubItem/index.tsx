import React from 'react'
import * as S from './style'
import { CheckmarkCircle, DodamColor } from '@b1nd/dds-web'
import { ClubProps } from 'src/types/club/club.type'

const ClubItem = ({value} : ClubProps) => {
  const { subject, name, description, state, image } = value

  return (
    <S.ClubItem>
      <S.ClubItemImage/>
      <S.ClubItemInfoContainer>
        <S.ClubItemSubject>{subject}</S.ClubItemSubject>
        <S.ClubItemNameState>
          <S.ClubItemName>
            {name}
          </S.ClubItemName>
          {state == 'OK' && <CheckmarkCircle size={20} color={DodamColor.green50}/>}
        </S.ClubItemNameState>
        <S.ClubItemDescription>{description}</S.ClubItemDescription>
      </S.ClubItemInfoContainer>
    </S.ClubItem>
  )
}

export default ClubItem