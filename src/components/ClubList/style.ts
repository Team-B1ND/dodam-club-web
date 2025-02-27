import styled from "styled-components";
import { DodamShape, DodamTypography, } from "@b1nd/dds-web";

export const ClubListContainer = styled.div`
  flex-grow: 1;
  ${DodamShape.Large};
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
`

export const ClubListHead = styled.p`
  ${DodamTypography.Heading1.Bold}
`

export const ClubItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 16px;
  overflow-y: scroll;
`

export const ClubMenu = styled.div`
  padding: 16px 0;
`