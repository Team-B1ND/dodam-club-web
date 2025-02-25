import React from 'react'
import * as S from './style'
import ClubMiniItem from './ClubMiniItem'
import { ClubMenuProps } from 'src/types/club/club.type'

const ClubMiniList = ({ name, value } : ClubMenuProps ) => {

  return (
    <S.ClubListContainer>
      {name}
      {value.map((item) => (
        <ClubMiniItem value={item}/>
      ))}
    </S.ClubListContainer>
  )
}

export default ClubMiniList