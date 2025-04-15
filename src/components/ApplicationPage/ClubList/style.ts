import { DodamShape, DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

export const ClubListContent = styled.div`
  height: 350px;
  padding: 12px 0px;
  overflow-y: auto;
  flex: 1;
  ${DodamShape.Small}
  &::-webkit-scrollbar {
    display: none;
  }
  
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.labelAssistive};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color:${({ theme }) => theme.labelAlternative};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.LabelNeutral};
  }
`;

export const EmptyClubList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

export const EmptyStateText = styled.p`
  ${DodamTypography.Body1.Medium}
  color: ${({ theme }) => theme.labelAlternative};
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
  background-color: ${({ selected, theme }) => selected ? theme.backgroundAssistive : 'transparent'};
  
  &:hover {
    background-color: ${({ theme, selected }) => selected ? theme.backgroundAssistive : theme.backgroundAlternative};
  }
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