import * as S from './style'
import { CheckmarkCircle, Clock, DodamColor } from '@b1nd/dds-web'
import { ClubProps } from 'src/types/club/club.type'
import { EClubState } from 'src/enum/club/club.enum'
import Skeleton from '@components/Skeleton'


const ClubItem = ({ value } : ClubProps) => {
  const { subject, name, shortDescription, state, image } = value

  return (
    <S.ClubItem>
      <S.ClubItemImage src={image}/>
      <S.ClubItemInfoContainer>
        <S.ClubItemSubject>{subject}</S.ClubItemSubject>
        <S.ClubItemNameState>
          <S.ClubItemName>
            {name}
          </S.ClubItemName>
          {state == EClubState.ALLOWED
          ? <CheckmarkCircle size={24} color={DodamColor.green50}/>
          : state == EClubState.PENDING
            && <Clock size={24} color={DodamColor.yellow50}/>
          }
        </S.ClubItemNameState>
        <S.ClubItemDescription>{shortDescription}</S.ClubItemDescription>
      </S.ClubItemInfoContainer>
    </S.ClubItem>
  )
}

export default ClubItem