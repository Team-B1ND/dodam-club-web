import { DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

export const EssayTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  width: 70%;
  margin-right: 1%;
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

export const ClubDot = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: -30px;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => (active ? theme.primaryNormal : theme.labelAssistive)};
  cursor: pointer;
  margin-left: -10px;
`;