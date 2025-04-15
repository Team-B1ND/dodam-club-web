import React from 'react';
import * as S from './style';
import { ClubResponse } from 'src/types/club/club.type';
import EmptyState from '../EmptyState';

interface CreativeClubSectionProps {
  hasJoinedCreativeClub: boolean;
  currentClub: number | null;
  currentClubsList: ClubResponse[];
}

const CreativeClubSection: React.FC<CreativeClubSectionProps> = ({
  hasJoinedCreativeClub,
  currentClub,
  currentClubsList
}) => {
  if (hasJoinedCreativeClub) {
    return (
      <S.ClubDescriptionSection>
        <EmptyState message='이미 창체 동아리에 가입되어 있습니다.' />
      </S.ClubDescriptionSection>
    );
  }

  if (currentClub === null) {
    return (
      <S.ClubDescriptionSection>
        <EmptyState message='신청할 동아리를 선택해주세요.' />
      </S.ClubDescriptionSection>
    );
  }

  const selectedClub = currentClubsList.find(club => club.id === currentClub);
    
  return (
    <S.ClubDescriptionSection>
      {selectedClub ? (
        <S.MarkDownViewer source={selectedClub.description} />
      ) : (
        <EmptyState message='동아리 정보를 불러올 수 없습니다.' />
      )}
    </S.ClubDescriptionSection>
  );
};

export default CreativeClubSection;