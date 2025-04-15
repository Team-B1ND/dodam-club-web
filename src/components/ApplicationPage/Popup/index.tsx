import { DodamModal } from "@b1nd/dds-web";
import * as S from './style';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCreativeClubs: string[]; 
  selectedAutonomousClubs: string[];
}

const ClubApplicationPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCreativeClubs,
  selectedAutonomousClubs,
}) => {
  return (
    <S.ModalWrapper isOpen={isOpen}>
      <DodamModal
        isOpen={isOpen}
        close={onClose}
        background={true}
      >
        <S.PopupContent>
          <S.PopupTitle>정말 확실합니까?</S.PopupTitle>
          
          <S.PopupText>
            창체동아리 : {selectedCreativeClubs.length > 0 ? selectedCreativeClubs.join(', ') : '없음'}
            <br />
            자율동아리 : {selectedAutonomousClubs.length > 0 ? selectedAutonomousClubs.join(', ') : '없음'}
            <br />
            위 동아리로 신청하시겠습니까?
          </S.PopupText>
          
          <S.ButtonContainer>
            <S.CancelButton onClick={onClose}>취소</S.CancelButton>
            <S.ConfirmButton onClick={onConfirm}>신청 완료하기</S.ConfirmButton>
          </S.ButtonContainer>
        </S.PopupContent>
      </DodamModal>
    </S.ModalWrapper>
  );
};

export default ClubApplicationPopup;