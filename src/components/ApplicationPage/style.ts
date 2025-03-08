import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 85vh;
  padding: 30px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  border-radius: 10px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.labelNormal};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
`;

export const SubTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.labelNormal};
`;

export const TabsContainer = styled.div`
  display: flex;
  border-radius: 10px;
  width: fit-content;
  padding: 5px;
  margin-bottom: 20px;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: calc(100% - 140px);
  height: 75%;
`;

export const ClubListSection = styled.div`
  width: 20vw;
  border-radius: 10px;
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

export const ClubListContent = styled.div`
  padding: 12px 0px;
  overflow-y: auto;
  flex: 1;
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

export const ErrorText = styled.p`
  font-size: 16px;
  color: #ff4444;
  margin-bottom: 16px;
  text-align: center;
`;

export const RetryButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #0083F0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #0070d1;
  }
`;

export const EmptyClubList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  height: 90%;
`;

export const ClubItem = styled.div<{ selected?: boolean }>`
  padding: 12px 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  cursor: pointer;
  color: ${({ theme }) => theme.labelNormal};
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriorityBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 24px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.primaryNormal};
  color: ${({ theme }) => theme.staticWhite};
  font-size: 14px;
  font-weight: bold;
`;

export const SelectButton = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
  text-align: center;
  height: 24px;
  width: 46px;
  padding: 0 6px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.staticWhite};
  background-color: ${({ theme }) => theme.primaryNormal};
  border-radius: 30px;
  user-select: none;
`;


export const EssayTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  width: 70%;
  margin-right: -20px;
`;

export const EssayTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.labelNormal};
`;

export const DotSelector = styled.div`
  height: 70%;
  display: flex;
  gap: 8px;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#0083F0' : '#e0e0e0')};
  cursor: pointer;
  margin-left: -10px;
`;

export const EssaySection = styled.div`
  position: absolute;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
  border-radius: 10px;
  padding: 20px;
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const MegaphoneIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

export const EmptyStateText = styled.p`
  font-size: 16px;
  color: #666;
`;

export const EssayTextarea = styled.textarea`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.labelNormal};
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  resize: none;
  &:focus {
    outline: none;
    border-color: #0083F0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -20px;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background-color: #1E1E1E;
  border-radius: 10px;
  width: 400px;
  overflow: hidden;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const PopupContent = styled.div`
  padding: 24px;
`;

export const PopupTitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

export const PopupText = styled.p`
  color: white;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const Button = styled.button`
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: #0083F0;
  border: none;
  color: white;
  
  &:hover {
    background-color: #0070d1;
  }
`;


export const ClubDot = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: -30px;
`;

export const ClubDescriptionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 16px;
`;

export const ClubDescriptionSection = styled.div`
  position: absolute;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
  border-radius: 10px;
  padding: 20px;
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  overflow-y: auto;
  color: ${({ theme }) => theme.labelNormal};
`;

export const ClubDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
`;

export const ApplyButton = styled.button<{ 
  enabled: boolean,
  isCreativeComplete?: boolean 
}>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: #0083F0;
  opacity: ${({ isCreativeComplete }) => (isCreativeComplete ? 1 : 0.5)};
  color: #fff;
  border-radius: 8px;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s ease, opacity 0.2s ease;
`;