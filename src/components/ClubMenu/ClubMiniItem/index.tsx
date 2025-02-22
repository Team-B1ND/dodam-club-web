import React from 'react'
import * as S from './style'
import { MiniClubProps } from 'src/types/club/club.type'

const ClubMiniItem = ({ value, type } : MiniClubProps) => {
  const { name, state } = value

  return (
    <S.ClubMiniItem>
      <S.ClubMiniItemName>{name}</S.ClubMiniItemName>
      {state}
    </S.ClubMiniItem>
  )
}

export default ClubMiniItem