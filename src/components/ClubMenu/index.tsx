import React from 'react'
import * as S from './style'
import ClubMiniList from '@components/ClubMenu/ClubMiniList'
import { ClubMenuProps } from 'src/types/club/club.type';

const ClubMenu = ({ name, value } : ClubMenuProps) => {
  return (
    <S.ClubMenuContainer>
      {name}
      <S.MyClubList>
        <ClubMiniList name="창체" value={value.filter((item) => (item.isCreativeClub === true))}/>
        <ClubMiniList name="자율" value={value.filter((item) => (item.isCreativeClub === false))}/>
      </S.MyClubList>
    </S.ClubMenuContainer>
  )
}

export default ClubMenu