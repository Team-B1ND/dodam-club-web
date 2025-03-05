import React, { useState, useEffect } from 'react';
import * as S from './style';
import megaphoneIcon from '../../assets/megaphone.svg';
import { useGetClubsQuery } from 'src/queries/useClub';
import clubApi from 'src/api/Club/club.api';
import { ClubResponse } from 'src/types/club/club.type';

interface EssayData {
  [key: string]: string;
}

const ApplicationPage = () => {
  const { data: clubList, isLoading, isError } = useGetClubsQuery();
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isCreativeClubSelected, setIsCreativeClubSelected] = useState(true);
  const [currentClub, setCurrentClub] = useState<string>("");
  const [essayContents, setEssayContents] = useState<EssayData>({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const creativeClubs = clubList?.filter(club => club.type === 'CREATIVE_ACTIVITY_CLUB') || [];
  const autonomousClubs = clubList?.filter(club => club.type === 'SELF_DIRECT_ACTIVITY_CLUB') || [];

  useEffect(() => {
    if (isCreativeClubSelected) {
      setIsButtonEnabled(selectedClubs.length === 3);
    } else {
      setIsButtonEnabled(selectedClubs.length > 0);
    }
  }, [selectedClubs, isCreativeClubSelected]);

  const handleClubClick = (clubName: string) => {
    if (selectedClubs.includes(clubName)) {
      const updatedClubs = selectedClubs.filter(club => club !== clubName);
      setSelectedClubs(updatedClubs);
      
      if (currentClub === clubName) {
        if (updatedClubs.length > 0) {
          setCurrentClub(updatedClubs[0]);
        } else {
          setCurrentClub("");
        }
      }
    } else {
      if (isCreativeClubSelected && selectedClubs.length >= 3) {
        return;
      }
      
      const updatedClubs = [...selectedClubs, clubName];
      setSelectedClubs(updatedClubs);
      
      if (selectedClubs.length === 0) {
        setCurrentClub(clubName);
      }
    }
  };

  const handleTabSwitch = (isCreative: boolean) => {
    if (isCreative !== isCreativeClubSelected) {
      setIsCreativeClubSelected(isCreative);
      setSelectedClubs([]);
      setCurrentClub("");
    }
  };

  const getPriorityNumber = (clubName: string) => {
    if (isCreativeClubSelected) {
      const index = selectedClubs.indexOf(clubName);
      return index !== -1 ? index + 1 : null;
    }
    return null;
  };

  const handleDotClick = (clubName: string) => {
    setCurrentClub(clubName);
  };

  const handleEssayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentClub) {
      const updatedEssayContents = {
        ...essayContents,
        [currentClub]: event.target.value
      };
      setEssayContents(updatedEssayContents);
    }
  };

  const getClubId = (clubName: string): number => {
    const club = clubList?.find(club => club.name === clubName);
    return club ? club.id : 0;
  }

  const handleApply = async () => {
    if (!isButtonEnabled || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      for (const clubName of selectedClubs) {
        const clubId = getClubId(clubName);
        await clubApi.postJoinClubByRequest({id: clubId});
      }
      
      alert('동아리 입부 신청이 성공적으로 제출되었습니다!');
      setSelectedClubs([]);
      setCurrentClub("");
      setEssayContents({});
    } catch (error) {
      console.error('Error submitting club application:', error);
      alert('동아리 입부 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentClubsList = isCreativeClubSelected 
  ? creativeClubs 
  : autonomousClubs;

  const getSelectedClubDetails = () => {
    return selectedClubs.map(clubName => {
      return clubList?.find(club => club.name === clubName);
    }).filter((club): club is ClubResponse => club !== undefined);
  };

  const selectedClubDetails = getSelectedClubDetails();

  return (
    <S.Container>
      <S.Title>동아리 신청</S.Title>
      <S.HeaderSection>
        <S.SubTitle>동아리 선택</S.SubTitle>
        {selectedClubs.length > 0 ? (
          <S.EssayTitleWrapper>
            <S.EssayTitle>{currentClub} 동아리에 대한 자기소개 작성</S.EssayTitle>
            <S.DotSelector>
              {selectedClubDetails.map((club) => (
                <S.ClubDot 
                  key={club.id}
                  active={club.name === currentClub}
                  onClick={() => handleDotClick(club.name)}
                >
                  <S.Dot
                    active={club.name === currentClub}
                    onClick={() => handleDotClick(club.name)}
                  />
                </S.ClubDot>
              ))}
            </S.DotSelector>
          </S.EssayTitleWrapper>
        ) : (
          <S.EssayTitleWrapper>
            <S.EssayTitle>자기소개서 작성</S.EssayTitle>
          </S.EssayTitleWrapper>
        )}
      </S.HeaderSection>
      
      <S.TabsContainer>
        <S.Tab
          selected={isCreativeClubSelected}
          onClick={() => handleTabSwitch(true)}
        >
          창체 동아리 
        </S.Tab>
        <S.Tab
          selected={!isCreativeClubSelected}
          onClick={() => handleTabSwitch(false)}
        >
          자율 동아리
        </S.Tab>
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
                    onClick={() => handleClubClick(club.name)}
                    selected={selectedClubs.includes(club.name)}
                  >
                    {club.name}
                    {isCreativeClubSelected ? (
                      getPriorityNumber(club.name) && (
                        <S.PriorityBadge>{getPriorityNumber(club.name)}</S.PriorityBadge>
                      )
                    ) : (
                      selectedClubs.includes(club.name) && (
                        <S.SelectButton>선택</S.SelectButton>
                      )
                    )}
                  </S.ClubItem>
                ))
              )}
            </S.ClubListContent>
          )}
        </S.ClubListSection>
        <S.RightSection>
          <S.EssaySection>
            {selectedClubs.length > 0 && currentClub ? (
              <S.EssayTextarea 
                placeholder="희망 분야, 다짐 등을 작성해주세요." 
                value={essayContents[currentClub] || ''}
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
      </S.ContentSection>
      <S.ButtonWrapper>
        <S.ApplyButton 
          enabled={isButtonEnabled && !isSubmitting}
          onClick={handleApply}
          disabled={!isButtonEnabled || isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '동아리 입부 신청하기'}
        </S.ApplyButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default ApplicationPage;