import { DodamTypography } from "@b1nd/dds-web";
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
  align-items: center;
  width: 100%;
  height: fit-content;
  ${DodamTypography.Body2.Medium}
  & p {
    ${DodamTypography.Body2.Bold}
    color: ${({ theme }) => theme.labelNormal};
    cursor: pointer;
  }
`

export const ClubMiniItemRequestContainer = styled.div`
  display: flex;
  gap: 4px;
`