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
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.labelNormal};
  ${DodamTypography.Heading1.Bold}
  margin-bottom: 16px;
  div{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
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
  height: 70%;
`;

export const ClubListSection = styled.div`
  width: 20vw;
  ${DodamShape.Small}
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  height: 90%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -20px;
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