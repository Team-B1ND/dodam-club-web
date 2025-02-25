import React from 'react'
import * as S from './style'
import ClubMiniList from '@components/ClubMenu/ClubMiniList'
import { ClubMenuProps } from 'src/types/club/club.type';
import { EClub } from 'src/enum/club/club.enum';

const ClubMenu = ({ name, value } : ClubMenuProps) => {
  return (
    <S.ClubMenuContainer>
      {name}
      <S.MyClubList>
        <ClubMiniList name="창체" value={value.filter((item) => (item.type === EClub.CREATIVE_CLUB))}/>
        <ClubMiniList name="자율" value={value.filter((item) => (item.type === EClub.SELF_DIRECT_CLUB))}/>
      </S.MyClubList>
    </S.ClubMenuContainer>
  )
}

export default ClubMenu