import * as S from './style'
import { CheckmarkCircleFilled, Clock, DodamColor, XmarkCircle } from '@b1nd/dds-web'
import { ClubProps } from 'src/types/club/club.type'
import { EClubState } from 'src/enum/club/club.enum'



const ClubItem = ({ value, isEnded } : ClubProps) => {
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
          {isEnded
          && ( (state === EClubState.PENDING || state === EClubState.WAITING)
            ? <Clock color={DodamColor.yellow50} size={24}/>
            : state === EClubState.DELETED || state === EClubState.REJECTED
              ? <XmarkCircle color={DodamColor.red50} size={24}/>
              : <CheckmarkCircleFilled color={DodamColor.green50} size={24}/>)
          }
        </S.ClubItemNameState>
        <S.ClubItemDescription>{shortDescription}</S.ClubItemDescription>
      </S.ClubItemInfoContainer>
    </S.ClubItem>
  )
}

export default ClubItem