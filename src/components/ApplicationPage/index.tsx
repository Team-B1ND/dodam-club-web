import React, { useState, useEffect } from 'react';
import * as S from './style';
import megaphoneIcon from 'src/assets/megaphone.svg';
import { useGetClubsQuery } from 'src/queries/useClub';
import clubApi from 'src/api/Club/club.api';
import { ChevronLeft, DodamSegmentedButton, DodamTheme } from "@b1nd/dds-web";
import { useTheme } from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import ClubApplicationPopup from './Popup/index';
import { useNavigate } from 'react-router-dom';

interface ClubResponse {
  id: number;
  name: string;
  description: string;
  type: 'CREATIVE_ACTIVITY_CLUB' | 'SELF_DIRECT_ACTIVITY_CLUB';
}

interface EssayData {
  [key: string]: string;
}

const ApplicationPage = () => {
  const navigate = useNavigate();

  const theme = useTheme() as DodamTheme;
  const { data: clubList, isLoading, isError } = useGetClubsQuery();
  const [selectedCreativeClubs, setSelectedCreativeClubs] = useState<number[]>([]);
  const [selectedAutonomousClubs, setSelectedAutonomousClubs] = useState<number[]>([]);
  const [isCreativeClubSelected, setIsCreativeClubSelected] = useState(true);
  const [currentClub, setCurrentClub] = useState<number | null>(null);
  const [essayContents, setEssayContents] = useState<EssayData>({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const creativeClubs = clubList?.filter(club => club.type === 'CREATIVE_ACTIVITY_CLUB') || [];
  const autonomousClubs = clubList?.filter(club => club.type === 'SELF_DIRECT_ACTIVITY_CLUB') || [];

  useEffect(() => {
    if (selectedCreativeClubs.length === 3) {
      setIsButtonEnabled(true);
      return;
    }else if(selectedCreativeClubs.length < 3){
      setIsButtonEnabled(false);
      return
    }
    
    const completedAutonomousClubs = selectedAutonomousClubs.filter(
      clubId => {
        const clubKey = clubId.toString();
        return essayContents[clubKey] && essayContents[clubKey].trim() !== '';
      }
    );
    
    setIsButtonEnabled(completedAutonomousClubs.length > 0);
  }, [
    selectedCreativeClubs, 
    selectedAutonomousClubs, 
    essayContents, 
    isCreativeClubSelected
  ]);

  const changePage = () => {
    setIsCreativeClubSelected(prev => !prev);
    setCurrentClub(null);
  }

  const handleCreativeClubClick = (club: ClubResponse) => {
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

  const getSelectedClubNames = (clubIds: number[]): string[] => {
    return clubIds.map(id => getClubNameById(id));
  };
  
  const getPriorityNumber = (clubId: number) => {
    const index = selectedCreativeClubs.indexOf(clubId);
    return index !== -1 ? index + 1 : null;
  };

  const handleEssayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentClub !== null) {
      const clubKey = currentClub.toString();
      const updatedEssayContents = {
        ...essayContents,
        [clubKey]: event.target.value
      };
      setEssayContents(updatedEssayContents);
    }
  };
  
  const currentClubsList = isCreativeClubSelected 
    ? creativeClubs 
    : autonomousClubs;
  const getClubNameById = (clubId: number): string => {
    const club = clubList?.find(club => club.id === clubId);
    return club ? club.name : '';
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
      
      // 창체 동아리 신청
      const priorities = ['CREATIVE_ACTIVITY_CLUB_1', 'CREATIVE_ACTIVITY_CLUB_2', 'CREATIVE_ACTIVITY_CLUB_3'] as const;

      for (let i = 0; i < selectedCreativeClubs.length; i++) {
        const clubId = selectedCreativeClubs[i];
        requests.push({
          clubId,
          clubPriority: priorities[i],
          introduction: ''
        });
      }
      
      // 자율 동아리 신청
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
      }
      
      alert('동아리 입부 신청이 성공적으로 제출되었습니다!');
      // 나머지 성공 처리 코드
      
    } catch (error) {
      console.error('Error submitting club application:', error);
      alert('동아리 입부 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentClubName = (): string => {
    if (currentClub === null) return '';
    return getClubNameById(currentClub);
  };

  const renderRightSection = () => {
    if (isCreativeClubSelected) {
      const selectedClub = currentClubsList.find(club => club.id === currentClub);
      return (
        <S.RightSection>
          <S.ClubDescriptionSection>
            {selectedClub ? (
              <S.MarkDownViewer
                source={selectedClub.description}
              />
            ) : (
              <S.EmptyState>
                <S.MegaphoneIcon src={megaphoneIcon} alt="메가폰" />
                <S.EmptyStateText>신청할 동아리를 선택해주세요.</S.EmptyStateText>
              </S.EmptyState>
            )}
          </S.ClubDescriptionSection>
        </S.RightSection>
      );
    } else {
      return (
        <S.RightSection>
          <S.EssaySection>
            {selectedAutonomousClubs.length > 0 && currentClub !== null ? (
              <S.EssayTextarea 
                placeholder="희망 분야, 다짐 등을 작성해주세요." 
                value={essayContents[currentClub.toString()] || ''}
                onChange={handleEssayChange}
              />
            ) : (
              <S.EmptyState>
                <S.MegaphoneIcon src={megaphoneIcon} alt="메가폰" />
                <S.EmptyStateText>신청할 동아리를 선택해주세요.</S.EmptyStateText>
              </S.EmptyState>
            )}
          </S.EssaySection>
        </S.RightSection>
      );
    }
  };
  return (
    <S.Container>
      <S.Title> <div onClick={()=>navigate("/")}><ChevronLeft color="labelNormal"/></div> 동아리 신청</S.Title>
      <S.HeaderSection>
        <S.SubTitle>동아리 선택</S.SubTitle>
        {(isCreativeClubSelected ? selectedCreativeClubs : selectedAutonomousClubs).length > 0 ? (
          <S.EssayTitleWrapper>
            <S.EssayTitle>
              {getCurrentClubName()} 동아리 {isCreativeClubSelected ? '소개' : '자기소개'}
            </S.EssayTitle>
            <S.DotSelector>
              {(isCreativeClubSelected ? selectedCreativeClubs : selectedAutonomousClubs).map((clubId) => (
                <S.ClubDot 
                  key={clubId}
                  active={clubId === currentClub}
                  onClick={() => setCurrentClub(clubId)}
                >
                  <S.Dot
                    active={clubId === currentClub}
                  />
                </S.ClubDot>
              ))}
            </S.DotSelector>
          </S.EssayTitleWrapper>
        ) : (
          <S.EssayTitleWrapper>
            <S.EssayTitle>
              {isCreativeClubSelected ? '창체 동아리 선택' : '자율 동아리 선택'}
            </S.EssayTitle>
          </S.EssayTitleWrapper>
        )}
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
          {isLoading ? (
            <S.LoadingWrapper>
              <S.LoadingText>동아리 목록을 불러오는 중...</S.LoadingText>
            </S.LoadingWrapper>
          ) : isError ? (
            <S.ErrorWrapper>
              <S.ErrorText>동아리 목록을 불러오는 중 오류가 발생했습니다.</S.ErrorText>
              <S.RetryButton onClick={() => window.location.reload()}>
                다시 시도
              </S.RetryButton>
            </S.ErrorWrapper>
          ) : (
            <S.ClubListContent>
              {currentClubsList.length === 0 ? (
                <S.EmptyClubList>
                  <S.EmptyStateText>
                    {isCreativeClubSelected ? '창체 동아리가 ' : '자율 동아리가 '} 
                    없습니다.
                  </S.EmptyStateText>
                </S.EmptyClubList>
              ) : (
                currentClubsList.map(club => (
                  <S.ClubItem
                    key={club.id}
                    onClick={() => {
                      const clubData = club as ClubResponse;
                      (isCreativeClubSelected 
                        ? handleCreativeClubClick(clubData)
                        : handleAutonomousClubClick(clubData))
                    }}
                    selected={
                      isCreativeClubSelected 
                        ? selectedCreativeClubs.includes(club.id)
                        : selectedAutonomousClubs.includes(club.id)
                    }
                  >
                    {club.name}
                    {isCreativeClubSelected ? (
                      getPriorityNumber(club.id) && (
                        <S.PriorityBadge>{getPriorityNumber(club.id)}</S.PriorityBadge>
                      )
                    ) : (
                      selectedAutonomousClubs.includes(club.id) && (
                        <S.SelectButton>선택</S.SelectButton>
                      )
                    )}
                  </S.ClubItem>
                ))
              )}
            </S.ClubListContent>
          )}
        </S.ClubListSection>
        {renderRightSection()}
      </S.ContentSection>
      <S.ButtonWrapper>
        <S.ApplyButton 
          enabled={isButtonEnabled && !isSubmitting}
          isCreativeComplete={selectedCreativeClubs.length === 3}
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