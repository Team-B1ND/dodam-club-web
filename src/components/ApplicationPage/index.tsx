import * as S from './style';
import megaphoneIcon from 'src/assets/megaphone.svg';
import { useGetClubsQuery } from 'src/queries/useClub';
import { DodamSegmentedButton, DodamErrorBoundary } from "@b1nd/dds-web";
import ClubApplicationPopup from './Popup/index';
import useClubApplication from 'src/hooks/club/useClubApplication';

const ApplicationPage = () => {
  const { data: clubList, isLoading, isError } = useGetClubsQuery();
  const safeClubList = (!isLoading && !isError && clubList) ? clubList : [];
  
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

    if (currentClub === null) {
      return (
        <S.ClubDescriptionSection>
          {renderEmptyState('신청할 동아리를 선택해주세요.')}
        </S.ClubDescriptionSection>
      );
    }

    const selectedClub = currentClubsList.find(club => club.id === currentClub);
    
    return (
      <S.ClubDescriptionSection>
        {selectedClub ? (
          <S.MarkDownViewer source={selectedClub.description} />
        ) : (
          renderEmptyState('동아리 정보를 불러올 수 없습니다.')
        )}
      </S.ClubDescriptionSection>
    );
  };

  const renderAutonomousClubRightSection = () => {
    if (currentClub === null || selectedAutonomousClubs.length === 0) {
      return (
        <S.EssaySection>
          {renderEmptyState('신청할 동아리를 선택해주세요.')}
        </S.EssaySection>
      );
    }

    if (joinedAutonomousClubIds.includes(currentClub)) {
      return (
        <S.EssaySection>
          {renderEmptyState('이미 해당 자율 동아리에 가입되어 있습니다.')}
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
    
    if (!currentClubsList || currentClubsList.length === 0) {
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
              {/* 창체 동아리의 경우 우선순위 표시 */}
              {isCreativeClubSelected ? (
                getPriorityNumber(club.id) && (
                  <S.PriorityBadge>{getPriorityNumber(club.id)}</S.PriorityBadge>
                )
              ) : (
                /* 자율 동아리의 경우 선택 버튼 표시 */
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

  const renderEssayTitle = () => {
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