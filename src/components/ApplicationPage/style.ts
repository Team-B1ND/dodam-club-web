import { DodamShape, DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 85vh;
  padding: 30px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamShape.Large}
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.labelNormal};
  ${DodamTypography.Heading1.Bold}
  margin-bottom: 16px;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
`;

export const SubTitle = styled.h2`
  ${DodamTypography.Label.Medium}
  color: ${({ theme }) => theme.labelNormal};
`;

export const TabsContainer = styled.div`
  display: flex;
  ${DodamShape.Medium}
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
  ${DodamShape.Small}
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
    background-color: ${({ theme }) => theme.labelAssistive};
    ${DodamShape.Small}
  }
  
  &::-webkit-scrollbar-thumb {
    background-color:${({ theme }) => theme.labelAlternative};
    ${DodamShape.Small}
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.LabelNeutral};
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoadingText = styled.p`
  ${DodamTypography.Body1.Medium}
  color: ${({ theme }) => theme.labelAlternative};
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
  ${DodamTypography.Body1.Medium}
  color: ${({ theme }) => theme.labelAlternative};
  margin-bottom: 16px;
  text-align: center;
`;

export const RetryButton = styled.button`
  padding: 8px 16px;
  ${DodamTypography.Label.Medium}
  background-color: ${({ theme }) => theme.primaryNormal};
  border: none;
  ${DodamShape.ExtraSmall}
  cursor: pointer;
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
  ${DodamTypography.Headline.Bold}
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
  width: 26px;
  height: 22px;
  ${DodamShape.ExtraLarge}
  background-color: ${({ theme }) => theme.primaryNormal};
  color: ${({ theme }) => theme.staticWhite};
  ${DodamTypography.Label.Bold}
`;

export const SelectButton = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
  text-align: center;
  height: 22px;
  width: 46px;
  padding: 0 6px;
  ${DodamShape.ExtraLarge}
  color: ${({ theme }) => theme.staticWhite};
  background-color: ${({ theme }) => theme.primaryNormal};
  ${DodamTypography.Body1.Bold}
  user-select: none;
`;


export const EssayTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  width: 70%;
  margin-right: -10px;
`;

export const EssayTitle = styled.h2`
  ${DodamTypography.Heading2.Medium}
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
  ${DodamShape.ExtraLarge}
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
  ${DodamShape.Small}
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
  ${DodamTypography.Body1.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`;

export const EssayTextarea = styled.textarea`
  flex: 1;
  ${DodamTypography.Body2.Regular}
  color: ${({ theme }) => theme.labelNormal};
  border: none;
  ${DodamShape.Small}
  background-color: ${({ theme }) => theme.backgroundNormal};
  resize: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -20px;
`;

export const ClubDot = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: -30px;
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
  ${DodamShape.Large};
  padding: 20px;
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  overflow-y: auto;
  color: ${({ theme }) => theme.labelNormal};
`;

export const ApplyButton = styled.button<{ 
  enabled: boolean,
  isCreativeComplete?: boolean 
}>`
  padding: 12px 24px;
  ${DodamTypography.Body1.Bold}
  border: none;
  background-color: ${({ theme }) => theme.primaryNormal};
  opacity: ${({ isCreativeComplete }) => (isCreativeComplete ? 1 : 0.5)};
  color: ${({ theme }) => theme.staticWhite};
  ${DodamShape.Medium};
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s ease, opacity 0.2s ease;
`;