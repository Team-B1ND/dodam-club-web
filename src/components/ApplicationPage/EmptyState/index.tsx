import React from 'react';
import * as S from './style';
import megaphoneIcon from 'src/assets/megaphone.svg';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <S.EmptyState>
      <S.MegaphoneIcon src={megaphoneIcon} alt="메가폰" />
      <S.EmptyStateText>{message}</S.EmptyStateText>
    </S.EmptyState>
  );
};

export default EmptyState;