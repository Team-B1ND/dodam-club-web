import { DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

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