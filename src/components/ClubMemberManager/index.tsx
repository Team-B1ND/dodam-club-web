import { Close, DodamModal } from '@b1nd/dds-web'
import * as S from './style'
import { useState } from 'react'
import ManagerMemberList from 'src/components/ManagerMemberList'
import { ClubResponse } from 'src/types/club/club.type';

interface ClubMemberManagerProps {
  close: () => void;
  isOpen: boolean;
  myClub: ClubResponse;
}
const ClubMemberManager = ({ 
  close,
  isOpen,
  myClub
}: ClubMemberManagerProps) => {
  const [selectedMember, setSelectedMember] = useState<number>(0);

  return (
    <DodamModal isOpen={isOpen} background>
      <S.ClubManager>
        <S.ClubManagerContainer>
          <div onClick={close}>
            <Close $svgStyle={{ cursor: "pointer" }} color="labelNormal" />
          </div>
          <S.ClubManagerInfoContainer>
            <ManagerMemberList id={myClub?.id} selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
          </S.ClubManagerInfoContainer>
        </S.ClubManagerContainer>
      </S.ClubManager>
    </DodamModal>
  );
};

export default ClubMemberManager;
