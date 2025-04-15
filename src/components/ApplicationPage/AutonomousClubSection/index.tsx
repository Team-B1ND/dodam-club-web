import React from 'react';
import * as S from './style';
import EmptyState from '../EmptyState';

interface AutonomousClubSectionProps {
  currentClub: number | null;
  selectedAutonomousClubs: number[];
  joinedAutonomousClubIds: number[];
  essayContents: Record<string, string>;
  handleEssayChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutonomousClubSection: React.FC<AutonomousClubSectionProps> = ({
  currentClub,
  selectedAutonomousClubs,
  joinedAutonomousClubIds,
  essayContents,
  handleEssayChange
}) => {
  if (currentClub === null || selectedAutonomousClubs.length === 0) {
    return (
      <S.EssaySection>
        <EmptyState message='신청할 동아리를 선택해주세요.' />
      </S.EssaySection>
    );
  }

  if (joinedAutonomousClubIds.includes(currentClub)) {
    return (
      <S.EssaySection>
        <EmptyState message='이미 해당 자율 동아리에 가입되어 있습니다.' />
      </S.EssaySection>
    );
  }

  return (
    <S.EssaySection>
      <S.EssayTextarea 
        placeholder="희망 분야, 다짐 등을 작성해주세요. (선택사항)" 
        value={essayContents[currentClub.toString()] || ''}
        onChange={handleEssayChange}
      />
    </S.EssaySection>
  );
};

export default AutonomousClubSection;