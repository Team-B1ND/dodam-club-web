import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 85vh;
  padding: 30px 30px;
  background-color: #ffffff;
  border-radius: 10px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000000;
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
  color: #000000;
`;

export const TabsContainer = styled.div`
  display: flex;
  background-color: #E6E6E7;
  border-radius: 10px;
  width: fit-content;
  padding: 5px;
  margin-bottom: 20px;
`;

export const Tab = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? '#000000' : '#747678')};
  background-color: ${({ selected }) => (selected ? '#fff' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
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
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  height: 90%;
  display: flex;
  flex-direction: column;
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
  color: white;
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
  color: #000000;
  background-color: ${({ selected }) => (selected ? '#f5f5f5' : 'transparent')};
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const PriorityBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #0083F0;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export const SelectButton = styled.div`
  display: flex;
  align-items: center; 
  height: 24px;
  width: 46px;
  padding: 6px 14px;
  font-size: 10px;
  font-weight: 700;
  color: white;
  background-color: #0083F0;
  border: none;
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
  color: #000000;
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
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
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
  color: black;
  border: none;
  border-radius: 8px;
  background-color: white;
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

export const ApplyButton = styled.button<{ enabled: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: ${({ enabled }) => (enabled ? '#4D9FFF' : '#cccccc')};
  border: none;
  border-radius: 8px;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ enabled }) => (enabled ? '#3d8de0' : '#cccccc')};
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
