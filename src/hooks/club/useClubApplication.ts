import { useState, useEffect } from 'react';
import clubApi from 'src/api/Club/club.api';
import { ClubResponse } from 'src/types/club/club.type';

interface EssayData {
  [key: string]: string;
}

interface UseClubApplicationProps {
  clubList?: ClubResponse[];
}

export default function useClubApplication({ clubList = [] }: UseClubApplicationProps) {
  // 선택 상태 관리
  const [selectedCreativeClubs, setSelectedCreativeClubs] = useState<number[]>([]);
  const [selectedAutonomousClubs, setSelectedAutonomousClubs] = useState<number[]>([]);
  const [isCreativeClubSelected, setIsCreativeClubSelected] = useState(true);
  const [currentClub, setCurrentClub] = useState<number | null>(null);
  
  // 에세이 관련 상태
  const [essayContents, setEssayContents] = useState<EssayData>({});
  
  // UI 상태
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 가입된 동아리 정보
  const [joinedClubs, setJoinedClubs] = useState<ClubResponse[]>([]);
  const [loadingJoinedClubs, setLoadingJoinedClubs] = useState(true);

  // 가입된 동아리 여부 확인
  const hasJoinedCreativeClub = (joinedClubs || []).some(
    club => club.type === 'CREATIVE_ACTIVITY_CLUB' && (club.myStatus || club.state) === 'ALLOWED'
  );

  // 가입된 자율 동아리 ID 목록
  const joinedAutonomousClubIds = (joinedClubs || [])
    .filter(club => club.type === 'SELF_DIRECT_ACTIVITY_CLUB' && (club.myStatus || club.state) === 'ALLOWED')
    .map(club => club.id);

  // 클럽 데이터 필터링
  const creativeClubs = clubList?.filter(club => club.type === 'CREATIVE_ACTIVITY_CLUB') || [];
  const autonomousClubs = clubList?.filter(club => club.type === 'SELF_DIRECT_ACTIVITY_CLUB') || [];
  const currentClubsList = isCreativeClubSelected ? creativeClubs : autonomousClubs;

  // 가입된 동아리 정보 가져오기
  const fetchJoinedClubs = async () => {
    try {
      setLoadingJoinedClubs(true);
      const response = await clubApi.getMyJoinedClubs();
      setJoinedClubs(response || []);
    } catch (error) {
      console.error('가입된 동아리 정보를 불러오는 중 오류가 발생했습니다:', error);
      setJoinedClubs([]);
    } finally {
      setLoadingJoinedClubs(false);
    }
  };

  // 페이지 전환 핸들러
  const changePage = () => {
    setIsCreativeClubSelected(prev => !prev);
    setCurrentClub(null);
  };

  // 버튼 상태 업데이트
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

  // 클럽 이름 가져오기
  const getClubNameById = (clubId: number): string => {
    const club = clubList?.find(club => club.id === clubId);
    return club ? club.name : '';
  };

  // 선택된 클럽 이름 목록 가져오기
  const getSelectedClubNames = (clubIds: number[]): string[] => {
    return clubIds.map(id => getClubNameById(id));
  };
  
  // 우선순위 번호 가져오기
  const getPriorityNumber = (clubId: number) => {
    const index = selectedCreativeClubs.indexOf(clubId);
    return index !== -1 ? index + 1 : null;
  };

  // 현재 선택된 클럽 이름 가져오기
  const getCurrentClubName = (): string => {
    if (currentClub === null) return '';
    return getClubNameById(currentClub);
  };

  // 창체 동아리 클릭 핸들러
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
  
  // 자율 동아리 클릭 핸들러
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

  // 에세이 변경 핸들러
  const handleEssayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentClub !== null) {
      const clubKey = currentClub.toString();
      setEssayContents({
        ...essayContents,
        [clubKey]: event.target.value
      });
    }
  };

  // 신청 버튼 클릭 핸들러
  const handleApplyButtonClick = () => {
    if (!isButtonEnabled || isSubmitting) return;
    setIsModalOpen(true);
  };
  
  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // 신청 처리 핸들러
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
            introduction: ""  // 빈 문자열로 변경 (API 형식에 맞춤)
          });
        }
      }
      
      for (const clubId of selectedAutonomousClubs) {
        const clubKey = clubId.toString();
        const introduction = essayContents[clubKey] || '';
        
        requests.push({
          clubId,
          // clubPriority 필드 제거 (API 형식에 맞춤)
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

  // 상태 업데이트 효과
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

  return {
    // 상태 변수
    states: {
      selectedCreativeClubs,
      selectedAutonomousClubs,
      isCreativeClubSelected,
      currentClub,
      essayContents,
      isButtonEnabled,
      isSubmitting,
      isModalOpen,
      joinedClubs,
      loadingJoinedClubs,
      hasJoinedCreativeClub,
      joinedAutonomousClubIds,
      creativeClubs,
      autonomousClubs,
      currentClubsList
    },
    
    // 상태 설정 함수
    setters: {
      setCurrentClub,
    },
    
    // 유틸리티 함수
    utils: {
      getClubNameById,
      getSelectedClubNames,
      getPriorityNumber,
      getCurrentClubName,
    },
    
    // 핸들러 함수
    handlers: {
      changePage,
      handleCreativeClubClick,
      handleAutonomousClubClick,
      handleEssayChange,
      handleApplyButtonClick,
      closeModal,
      handleApply,
      fetchJoinedClubs
    }
  };
}