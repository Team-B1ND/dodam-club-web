import styled from 'styled-components';

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
