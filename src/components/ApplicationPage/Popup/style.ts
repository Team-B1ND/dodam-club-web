import { DodamShape, DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  > div {
    width: 500px !important;
    ${DodamShape.Medium}
    background-color: ${({ theme }) => theme.backgroundNormal} !important;
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
    z-index: 1050 !important;
  }
`;

export const PopupContent = styled.div`
  padding: 2cap 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 440px;
  height: 230px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  border-radius: 28px;
`;

export const PopupTitle = styled.h2`
  color: ${({ theme }) => theme.labelNormal};
  ${DodamTypography.Heading1.Bold}
  margin-bottom: 6px;
  text-align: left;
  width: 100%;
`;

export const PopupText = styled.p`
  color: ${({ theme }) => theme.labelAlternative};
  ${DodamTypography.Body1.Medium}
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 16px 0;
  ${DodamTypography.Body1.Bold}
  ${DodamShape.Small}
  width: 200px;
  height: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
`;

export const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.FillNormal};
  border: none;
  color: ${({ theme }) => theme.LabelNeutral};
  
  &:active {
    transform: translateY(0);
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.primaryNormal};
  border: none;
  color: ${({ theme }) => theme.LabelNeutral};
  
  &:active {
    transform: translateY(0);
  }
`;