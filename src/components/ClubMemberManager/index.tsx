import { Close } from '@b1nd/dds-web'
import * as S from './style'
import { useEffect, useState } from 'react'
import { EClub, EClubState } from 'src/enum/club/club.enum'
import { ClubResponse } from 'src/types/club/club.type'
import ManagerMemberList from 'src/components/ManagerMemberList'

const ClubMemberManager = ({close, myClub, isLoading}: {close: () => void, myClub: ClubResponse[], isLoading:boolean}) => {
  const [ selectedClub, setSelectedClub ] = useState<number>();
  const [ selectedMember, setSelectedMember ] = useState<number>(0);

  useEffect(() => {
    if(!isLoading){
      setSelectedClub(myClub.filter((item) => item.state === EClubState.ALLOWED && item.type === EClub.SELF_DIRECT_CLUB)[0].id)
    }
  }, [myClub, isLoading]);
  
  const handleSelectedClub = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClub(+e.target.value)
  }

  return isLoading || (
    <S.ClubManager>
      <S.ClubManagerContainer>
        <div onClick={close}>
          <Close $svgStyle={{ cursor: "pointer" }} color="labelNormal" />
        </div>
        <S.ClubManagerMain>
          {myClub.length > 0
          && (
            <S.ClubManagerSelecter
              value={selectedClub}
              onChange={(e) => handleSelectedClub(e)}
            >
              {myClub!
              .filter((item) => item.state === EClubState.ALLOWED && item.type === EClub.SELF_DIRECT_CLUB )
              .map((item, idx) => (
                <option key={idx} value={item.id}>{item.name}</option>
              ))}
            </S.ClubManagerSelecter>
          )}
        </S.ClubManagerMain>
        <S.ClubManagerInfoContainer>
          <ManagerMemberList id={selectedClub!} selectedMember={selectedMember!} setSelectedMember={setSelectedMember}/>
        </S.ClubManagerInfoContainer>
      </S.ClubManagerContainer>
    </S.ClubManager>
  )
}

export default ClubMemberManager