import React from 'react';
import * as S from './style';

interface EssayTitleProps {
  isCreativeClubSelected: boolean;
  selectedCreativeClubs: number[];
  selectedAutonomousClubs: number[];
  currentClub: number | null;
  hasJoinedCreativeClub: boolean;
  getCurrentClubName: () => string;
  setCurrentClub: (clubId: number) => void;
}

const EssayTitle: React.FC<EssayTitleProps> = ({
  isCreativeClubSelected,
  selectedCreativeClubs,
  selectedAutonomousClubs,
  currentClub,
  hasJoinedCreativeClub,
  getCurrentClubName,
  setCurrentClub
}) => {
  const selectedClubIds = isCreativeClubSelected 
    ? selectedCreativeClubs 
    : selectedAutonomousClubs;

  if (selectedClubIds.length > 0 && currentClub !== null) {
    return (
      <S.EssayTitleWrapper>
        <S.EssayTitle>
          {getCurrentClubName()} 동아리 {isCreativeClubSelected ? '소개' : '자기소개'}
          {!isCreativeClubSelected && ' (선택사항)'}
        </S.EssayTitle>
        {selectedClubIds.length > 1 && (
          <S.DotSelector>
            {selectedClubIds.map((clubId) => (
              <S.ClubDot 
                key={clubId}
                active={clubId === currentClub}
                onClick={() => setCurrentClub(clubId)}
              >
                <S.Dot active={clubId === currentClub} />
              </S.ClubDot>
            ))}
          </S.DotSelector>
        )}
      </S.EssayTitleWrapper>
    );
  }

  return (
    <S.EssayTitleWrapper>
      <S.EssayTitle>
        {isCreativeClubSelected 
          ? (hasJoinedCreativeClub 
            ? '이미 창체 동아리에 가입되어 있습니다' 
            : '창체 동아리 선택') 
          : '자율 동아리 선택'}
      </S.EssayTitle>
    </S.EssayTitleWrapper>
  );
};

export default EssayTitle;