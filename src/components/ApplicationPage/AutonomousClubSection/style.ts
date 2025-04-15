import { DodamShape, DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

export const EssaySection = styled.div`
  position: absolute;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamShape.Large}
  padding: 20px;
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
`;

export const EssayTextarea = styled.textarea`
  flex: 1;
  ${DodamTypography.Body2.Regular}
  color: ${({ theme }) => theme.labelNormal};
  border: none;
  ${DodamShape.Small}
  background-color: ${({ theme }) => theme.backgroundNormal};
  resize: none;
  outline: none;
`;