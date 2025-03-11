import React, { useState, useEffect } from 'react';
import * as S from './style';
import megaphoneIcon from 'src/assets/megaphone.svg';
import { useGetClubsQuery } from 'src/queries/useClub';
import clubApi from 'src/api/Club/club.api';
import { DodamSegmentedButton, DodamErrorBoundary } from "@b1nd/dds-web";
import ClubApplicationPopup from './Popup/index';

interface ClubResponse {
  id: number;
  name: string;
  description: string;
  type: 'CREATIVE_ACTIVITY_CLUB' | 'SELF_DIRECT_ACTIVITY_CLUB';
  myStatus?: string;
}

interface EssayData {
  [key: string]: string;
}

const ApplicationPage = () => {
  const { data: clubList, isLoading, isError } = useGetClubsQuery();
  const [selectedCreativeClubs, setSelectedCreativeClubs] = useState<number[]>([]);
  const [selectedAutonomousClubs, setSelectedAutonomousClubs] = useState<number[]>([]);
  const [isCreativeClubSelected, setIsCreativeClubSelected] = useState(true);
  const [currentClub, setCurrentClub] = useState<number | null>(null);
  const [essayContents, setEssayContents] = useState<EssayData>({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinedClubs, setJoinedClubs] = useState<ClubResponse[]>([]);
  const [loadingJoinedClubs, setLoadingJoinedClubs] = useState(true);

  const hasJoinedCreativeClub = (joinedClubs || []).some(
    club => club.type === 'CREATIVE_ACTIVITY_CLUB' && club.myStatus === 'ALLOWED'
  );
  
  const joinedAutonomousClubIds = (joinedClubs || [])
    .filter(club => club.type === 'SELF_DIRECT_ACTIVITY_CLUB' && club.myStatus === 'ALLOWED')
    .map(club => club.id);

  const creativeClubs = clubList?.filter(club => club.type === 'CREATIVE_ACTIVITY_CLUB') || [];
  const autonomousClubs = clubList?.filter(club => club.type === 'SELF_DIRECT_ACTIVITY_CLUB') || [];
  
  const currentClubsList = isCreativeClubSelected ? creativeClubs : autonomousClubs;

  useEffect(() => {
    fetchJoinedClubs();
  }, []);
  
  useEffect(() => {
    updateButtonState();
  }, [
    selectedCreativeClubs, 
    selectedAutonomousClubs, 
    essayContents, 
    isCreativeClubSelected,
    hasJoinedCreativeClub
  ]);

  const fetchJoinedClubs = async () => {
    try {
      setLoadingJoinedClubs(true);
      const response = await clubApi.getMyJoinedClubs();
      setJoinedClubs((response as ClubResponse[]) || []);
    } catch (error) {
      console.error('가입된 동아리 정보를 불러오는 중 오류가 발생했습니다:', error);
      setJoinedClubs([]);
    } finally {
      setLoadingJoinedClubs(false);
    }
  };

  const updateButtonState = () => {
    const validCreativeSelection = 
      !isCreativeClubSelected || 
      hasJoinedCreativeClub || 
      selectedCreativeClubs.length === 0 || 
      selectedCreativeClubs.length === 3;
    
    const hasAnySelection = 
      (isCreativeClubSelected && !hasJoinedCreativeClub && selectedCreativeClubs.length > 0) || 
      (!isCreativeClubSelected && selectedAutonomousClubs.length > 0);

    setIsButtonEnabled(hasAnySelection && validCreativeSelection);
  };

  const getClubNameById = (clubId: number): string => {
    const club = clubList?.find(club => club.id === clubId);
    return club ? club.name : '';
  };

  const getSelectedClubNames = (clubIds: number[]): string[] => {
    return clubIds.map(id => getClubNameById(id));
  };
  
  const getPriorityNumber = (clubId: number) => {
    const index = selectedCreativeClubs.indexOf(clubId);
    return index !== -1 ? index + 1 : null;
  };

  const getCurrentClubName = (): string => {
    if (currentClub === null) return '';
    return getClubNameById(currentClub);
  };

  const changePage = () => {
    setIsCreativeClubSelected(prev => !prev);
    setCurrentClub(null);
  };

  const handleCreativeClubClick = (club: ClubResponse) => {
    if (hasJoinedCreativeClub) {
      return;
    }
    
    if (selectedCreativeClubs.includes(club.id)) {
      const updatedClubs = selectedCreativeClubs.filter(id => id !== club.id);
      setSelectedCreativeClubs(updatedClubs);
      
      if (currentClub === club.id) {
        setCurrentClub(updatedClubs.length > 0 ? updatedClubs[0] : null);
      }
    } else {
      if (selectedCreativeClubs.length < 3) {
        const updatedClubs = [...selectedCreativeClubs, club.id];
        setSelectedCreativeClubs(updatedClubs);
        setCurrentClub(club.id);
      }
    }
  };
  
  const handleAutonomousClubClick = (club: ClubResponse) => {
    if (joinedAutonomousClubIds.includes(club.id)) {
      return;
    }
    
    if (selectedAutonomousClubs.includes(club.id)) {
      const updatedClubs = selectedAutonomousClubs.filter(id => id !== club.id);
      setSelectedAutonomousClubs(updatedClubs);
      
      if (currentClub === club.id) {
        setCurrentClub(updatedClubs.length > 0 ? updatedClubs[0] : null);
      }
      
      const clubKey = club.id.toString();
      if (essayContents[clubKey]) {
        const updatedEssayContents = {...essayContents};
        delete updatedEssayContents[clubKey];
        setEssayContents(updatedEssayContents);
      }
    } else {
      const updatedClubs = [...selectedAutonomousClubs, club.id];
      setSelectedAutonomousClubs(updatedClubs);
      setCurrentClub(club.id);
    }
  };

  const handleEssayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentClub !== null) {
      const clubKey = currentClub.toString();
      setEssayContents({
        ...essayContents,
        [clubKey]: event.target.value
      });
    }
  };

  const handleApplyButtonClick = () => {
    if (!isButtonEnabled || isSubmitting) return;
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleApply = async () => {
    setIsModalOpen(false);
    
    if (!isButtonEnabled || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const requests = [];
      const priorities = ['CREATIVE_ACTIVITY_CLUB_1', 'CREATIVE_ACTIVITY_CLUB_2', 'CREATIVE_ACTIVITY_CLUB_3'] as const;
  
      if (!hasJoinedCreativeClub && selectedCreativeClubs.length === 3) {
        for (let i = 0; i < selectedCreativeClubs.length; i++) {
          const clubId = selectedCreativeClubs[i];
          requests.push({
            clubId,
            clubPriority: priorities[i],
            introduction: ''
          });
        }
      }
      
      for (const clubId of selectedAutonomousClubs) {
        const clubKey = clubId.toString();
        const introduction = essayContents[clubKey] || '';
        
        requests.push({
          clubId,
          clubPriority: null,
          introduction
        });
      }
      
      if (requests.length > 0) {
        await clubApi.postJoinClubByRequestsBatch(requests);
        alert('동아리 입부 신청이 성공적으로 제출되었습니다!');
        fetchJoinedClubs();
      } else {
        alert('신청할 동아리를 선택해주세요.');
      }
      
    } catch (error) {
      console.error('Error submitting club application:', error);
      alert('동아리 입부 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEmptyState = (message: string) => (
    <S.EmptyState>
      <S.MegaphoneIcon src={megaphoneIcon} alt="메가폰" />
      <S.EmptyStateText>{message}</S.EmptyStateText>
    </S.EmptyState>
  );

  const renderCreativeClubRightSection = () => {
    if (hasJoinedCreativeClub) {
      return (
        <S.ClubDescriptionSection>
          {renderEmptyState('이미 창체 동아리에 가입되어 있습니다.')}
        </S.ClubDescriptionSection>
      );
    }

    const selectedClub = currentClubsList.find(club => club.id === currentClub);
    return (
      <S.ClubDescriptionSection>
        {selectedClub ? (
          <S.MarkDownViewer source={selectedClub.description} />
        ) : (
          renderEmptyState('신청할 동아리를 선택해주세요.')
        )}
      </S.ClubDescriptionSection>
    );
  };

  const renderAutonomousClubRightSection = () => (
    <S.EssaySection>
      {selectedAutonomousClubs.length > 0 && currentClub !== null ? (
        <S.EssayTextarea 
          placeholder="희망 분야, 다짐 등을 작성해주세요. (선택사항)" 
          value={essayContents[currentClub.toString()] || ''}
          onChange={handleEssayChange}
        />
      ) : (
        renderEmptyState('신청할 동아리를 선택해주세요.')
      )}
    </S.EssaySection>
  );

  const renderRightSection = () => (
    <S.RightSection>
      {isCreativeClubSelected 
        ? renderCreativeClubRightSection() 
        : renderAutonomousClubRightSection()}
    </S.RightSection>
  );

  const renderClubList = () => {
    if (isLoading) {
      return (
        <S.LoadingWrapper>
          <S.LoadingText>동아리 목록을 불러오는 중...</S.LoadingText>
        </S.LoadingWrapper>
      );
    }
    
    if (currentClubsList.length === 0) {
      return (
        <S.EmptyClubList>
          <S.EmptyStateText>
            {isCreativeClubSelected ? '창체 동아리가 ' : '자율 동아리가 '} 
            없습니다.
          </S.EmptyStateText>
        </S.EmptyClubList>
      );
    }
    
    return (
      <S.ClubListContent>
        {currentClubsList.map(club => {
          const isJoinedAutonomousClub = !isCreativeClubSelected && joinedAutonomousClubIds.includes(club.id);
          
          return (
            <S.ClubItem
              key={club.id}
              onClick={() => {
                const clubData = club as ClubResponse;
                if (!isJoinedAutonomousClub && !(isCreativeClubSelected && hasJoinedCreativeClub)) {
                  (isCreativeClubSelected 
                    ? handleCreativeClubClick(clubData)
                    : handleAutonomousClubClick(clubData))
                }
              }}
              selected={
                isCreativeClubSelected 
                  ? selectedCreativeClubs.includes(club.id)
                  : selectedAutonomousClubs.includes(club.id)
              }
              style={
                (isCreativeClubSelected && hasJoinedCreativeClub) || isJoinedAutonomousClub
                  ? { opacity: 0.5, cursor: 'not-allowed' }
                  : {}
              }
            >
              {club.name}
              {isCreativeClubSelected ? (
                getPriorityNumber(club.id) && (
                  <S.PriorityBadge>{getPriorityNumber(club.id)}</S.PriorityBadge>
                )
              ) : (
                isJoinedAutonomousClub ? (
                  null
                ) : (
                  selectedAutonomousClubs.includes(club.id) && (
                    <S.SelectButton>선택</S.SelectButton>
                  )
                )
              )}
            </S.ClubItem>
          );
        })}
      </S.ClubListContent>
    );
  };

  const renderEssayTitle = () => {
    const selectedClubIds = isCreativeClubSelected 
      ? selectedCreativeClubs 
      : selectedAutonomousClubs;

    if (selectedClubIds.length > 0) {
      return (
        <S.EssayTitleWrapper>
          <S.EssayTitle>
            {getCurrentClubName()} 동아리 {isCreativeClubSelected ? '소개' : '자기소개'}
            {!isCreativeClubSelected && ' (선택사항)'}
          </S.EssayTitle>
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

  if (loadingJoinedClubs) {
    return (
      <S.Container>
        <S.Title>동아리 신청</S.Title>
        <S.LoadingWrapper>
          <S.LoadingText>가입 정보를 불러오는 중...</S.LoadingText>
        </S.LoadingWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>동아리 신청</S.Title>
      <S.HeaderSection>
        <S.SubTitle>동아리 선택</S.SubTitle>
        {renderEssayTitle()}
      </S.HeaderSection>
      
      <S.TabsContainer>
        <DodamSegmentedButton
          num={2}
          type="block"
          data={[
            { text: '창체동아리', isAtv: isCreativeClubSelected },
            { text: '자율동아리', isAtv: !isCreativeClubSelected }
          ]}
          width={200}
          height={45}
          onClick={changePage}
        />
      </S.TabsContainer>
      
      <S.ContentSection>
        <S.ClubListSection>
          <DodamErrorBoundary text='불러오는 중 에러가 발생했습니다.'>
            {renderClubList()}
          </DodamErrorBoundary>
        </S.ClubListSection>
        {renderRightSection()}
      </S.ContentSection>
      
      <S.ButtonWrapper>
        <S.ApplyButton 
          enabled={isButtonEnabled && !isSubmitting}
          isCreativeComplete={selectedCreativeClubs.length === 3 || (!isCreativeClubSelected && selectedAutonomousClubs.length > 0)}
          onClick={handleApplyButtonClick}
          disabled={!isButtonEnabled || isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '동아리 입부 신청하기'}
        </S.ApplyButton>
      </S.ButtonWrapper>
      
      <ClubApplicationPopup 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onConfirm={handleApply}
        selectedCreativeClubs={getSelectedClubNames(selectedCreativeClubs)}
        selectedAutonomousClubs={getSelectedClubNames(selectedAutonomousClubs)}
      />
    </S.Container>
  );
};

export default ApplicationPage;