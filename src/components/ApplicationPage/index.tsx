import React from 'react';
import * as S from './style';
import { useGetClubsQuery } from 'src/queries/useClub';
import { DodamSegmentedButton, DodamErrorBoundary } from "@b1nd/dds-web";
import ClubApplicationPopup from './Popup';
import useClubApplication from 'src/hooks/club/useClubApplication';

import LoadingState from 'src/components/ApplicationPage/LoadingState/index';
import ClubList from 'src/components/ApplicationPage/ClubList/index';
import EssayTitle from 'src/components/ApplicationPage/EssayTitle';
import CreativeClubSection from 'src/components/ApplicationPage/CreativeClubSection/index';
import AutonomousClubSection from 'src/components/ApplicationPage/AutonomousClubSection/index';

const ApplicationPage = () => {
  const { data: clubList, isLoading: isClubsLoading, isError } = useGetClubsQuery();
  const safeClubList = (!isClubsLoading && !isError && clubList) ? clubList : [];
  
  const {
    states: {
      selectedCreativeClubs,
      selectedAutonomousClubs,
      isCreativeClubSelected,
      currentClub,
      essayContents,
      isButtonEnabled,
      isSubmitting,
      isModalOpen,
      loadingJoinedClubs,
      hasJoinedCreativeClub,
      joinedAutonomousClubIds,
      currentClubsList
    },
    setters: {
      setCurrentClub
    },
    utils: {
      getClubNameById,
      getSelectedClubNames,
      getPriorityNumber,
      getCurrentClubName
    },
    handlers: {
      changePage,
      handleCreativeClubClick,
      handleAutonomousClubClick,
      handleEssayChange,
      handleApplyButtonClick,
      closeModal,
      handleApply
    }
  } = useClubApplication({ clubList: safeClubList });

  if (loadingJoinedClubs) {
    return (
      <S.Container>
        <S.Title>동아리 신청</S.Title>
        <LoadingState message="가입 정보를 불러오는 중..." />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>동아리 신청</S.Title>
      <S.HeaderSection>
        <S.SubTitle>동아리 선택</S.SubTitle>
        <EssayTitle 
          isCreativeClubSelected={isCreativeClubSelected}
          selectedCreativeClubs={selectedCreativeClubs}
          selectedAutonomousClubs={selectedAutonomousClubs}
          currentClub={currentClub}
          hasJoinedCreativeClub={hasJoinedCreativeClub}
          getCurrentClubName={getCurrentClubName}
          setCurrentClub={setCurrentClub}
        />
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
            <ClubList 
              isLoading={isClubsLoading}
              currentClubsList={currentClubsList}
              isCreativeClubSelected={isCreativeClubSelected}
              hasJoinedCreativeClub={hasJoinedCreativeClub}
              joinedAutonomousClubIds={joinedAutonomousClubIds}
              selectedCreativeClubs={selectedCreativeClubs}
              selectedAutonomousClubs={selectedAutonomousClubs}
              handleCreativeClubClick={handleCreativeClubClick}
              handleAutonomousClubClick={handleAutonomousClubClick}
              getPriorityNumber={getPriorityNumber}
            />
          </DodamErrorBoundary>
        </S.ClubListSection>
        
        <S.RightSection>
          {isCreativeClubSelected ? (
            <CreativeClubSection 
              hasJoinedCreativeClub={hasJoinedCreativeClub}
              currentClub={currentClub}
              currentClubsList={currentClubsList}
            />
          ) : (
            <AutonomousClubSection
              currentClub={currentClub}
              selectedAutonomousClubs={selectedAutonomousClubs}
              joinedAutonomousClubIds={joinedAutonomousClubIds}
              essayContents={essayContents}
              handleEssayChange={handleEssayChange}
            />
          )}
        </S.RightSection>
      </S.ContentSection>
      
      <S.ButtonWrapper>
        <S.ApplyButton 
          enabled={isButtonEnabled && !isSubmitting}
          isCreativeComplete={
            (isCreativeClubSelected && selectedCreativeClubs.length === 3) || 
            (!isCreativeClubSelected && selectedAutonomousClubs.length > 0)
          }
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