import styled from "styled-components";
import { DodamShape, DodamTypography } from "@b1nd/dds-web";

export const ClubListContainer = styled.div`
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  ${DodamShape.Large};
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  gap: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ClubListHead = styled.p`
  ${DodamTypography.Heading1.Bold}
  width: 100%;
`;

export const ClubMessage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${DodamTypography.Body1.Medium};
  color: ${({ theme }) => theme.labelNormal};
`;
