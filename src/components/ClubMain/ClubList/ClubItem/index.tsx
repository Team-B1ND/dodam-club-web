import * as S from './style'
import { ClubProps } from 'src/types/club/club.type'



const ClubItem = ({ value } : ClubProps) => {
  const { name, shortDescription, image } = value
  return (
    <S.ClubItem>
      <S.ClubItemImage src={image}/>
      <S.ClubItemInfoContainer>
        <S.ClubItemNameState>
          <S.ClubItemName>
            {name}
          </S.ClubItemName>
        </S.ClubItemNameState>
        <S.ClubItemDescription>{shortDescription}</S.ClubItemDescription>
      </S.ClubItemInfoContainer>
    </S.ClubItem>
  )
}

export default ClubItem