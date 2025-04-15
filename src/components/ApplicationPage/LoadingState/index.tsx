import React from 'react';
import * as S from './style';

interface LoadingStateProps {
  message: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <S.LoadingWrapper>
      <S.LoadingText>{message}</S.LoadingText>
    </S.LoadingWrapper>
  );
};

export default LoadingState;