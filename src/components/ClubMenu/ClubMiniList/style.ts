import { CheckmarkCircleFilled, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const ClubListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${DodamTypography.Label.Bold}
  color: ${({ theme }) => theme.labelAlternative};
`

export const ClubMiniItem = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ClubMiniItemName = styled.p`
  ${DodamTypography.Body2.Medium}
  color: ${({ theme }) => theme.labelNormal};
  cursor: pointer;
`

export const ClubMiniItemRequestContainer = styled.div`
  display: flex;
  gap: 4px;
`