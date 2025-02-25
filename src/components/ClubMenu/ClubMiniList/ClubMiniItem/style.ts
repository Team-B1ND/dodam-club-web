import { DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const ClubMiniItem = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

export const ClubMiniItemName = styled.p`
  ${DodamTypography.Body2.Medium}
  color: ${({ theme }) => theme.labelNormal};
`