import React from 'react'
import * as S from './style'
import ClubMiniList from '@components/ClubMenu/ClubMiniList'
import { ClubMenuProps } from 'src/types/club/club.type';
import { EClub } from 'src/enum/club/club.enum';

const ClubMenu = ({ name, value, type } : ClubMenuProps) => {
  return value.length > 0 && (
    <S.ClubMenuContainer>
      {name}
      <S.MyClubList>
        <ClubMiniList name="창체" type={type} value={value.filter((item) => (item.club.type === EClub.CREATIVE_CLUB))}/>
        <ClubMiniList name="자율" type={type} value={value.filter((item) => (item.club.type === EClub.SELF_DIRECT_CLUB))}/>
      </S.MyClubList>
    </S.ClubMenuContainer>
  )
}

export default ClubMenu