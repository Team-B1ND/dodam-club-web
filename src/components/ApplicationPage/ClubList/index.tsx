// components/ApplicationPage/components/ClubList/index.tsx
import React from 'react';
import * as S from './style';
import { ClubResponse } from 'src/types/club/club.type';
import LoadingState from '../LoadingState';

interface ClubListProps {
  isLoading: boolean;
  currentClubsList: ClubResponse[];
  isCreativeClubSelected: boolean;
  hasJoinedCreativeClub: boolean;
  joinedAutonomousClubIds: number[];
  selectedCreativeClubs: number[];
  selectedAutonomousClubs: number[];
  handleCreativeClubClick: (club: ClubResponse) => void;
  handleAutonomousClubClick: (club: ClubResponse) => void;
  getPriorityNumber: (clubId: number) => number | null | undefined; // null도 허용하도록 수정
}

const ClubList: React.FC<ClubListProps> = ({
  isLoading,
  currentClubsList,
  isCreativeClubSelected,
  hasJoinedCreativeClub,
  joinedAutonomousClubIds,
  selectedCreativeClubs,
  selectedAutonomousClubs,
  handleCreativeClubClick,
  handleAutonomousClubClick,
  getPriorityNumber,
}) => {
  // 나머지 코드는 동일
  
  return (
    <S.ClubListContent>
      {currentClubsList.map(club => {
        const isJoinedAutonomousClub = !isCreativeClubSelected && joinedAutonomousClubIds.includes(club.id);
        const isDisabled = (isCreativeClubSelected && hasJoinedCreativeClub) || isJoinedAutonomousClub;
        
        const isSelected = isCreativeClubSelected 
          ? selectedCreativeClubs.includes(club.id)
          : selectedAutonomousClubs.includes(club.id);
        
        return (
          <S.ClubItem
            key={club.id}
            onClick={() => {
              if (!isDisabled) {
                (isCreativeClubSelected 
                  ? handleCreativeClubClick(club)
                  : handleAutonomousClubClick(club))
              }
            }}
            selected={isSelected}
            style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {club.name}
            {isCreativeClubSelected ? (
              // null과 undefined 모두 falsy 값이므로 이 코드는 그대로 동작합니다
              getPriorityNumber(club.id) && (
                <S.PriorityBadge>{getPriorityNumber(club.id)}</S.PriorityBadge>
              )
            ) : (
              isJoinedAutonomousClub ? null : (
                isSelected && <S.SelectButton>선택</S.SelectButton>
              )
            )}
          </S.ClubItem>
        );
      })}
    </S.ClubListContent>
  );
};

export default ClubList;