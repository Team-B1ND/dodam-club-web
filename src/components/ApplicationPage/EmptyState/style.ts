import { DodamTypography } from '@b1nd/dds-web';
import styled from 'styled-components';

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