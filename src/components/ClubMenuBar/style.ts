import { DodamShape, DodamTypography } from "@b1nd/dds-web"
import styled from "styled-components"

export const ClubMenubarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 16px;
  white-space: nowrap; 
  & a {
    text-decoration: none;
  }
`

export const ClubMenubarItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  height: 150px;
  justify-content: center;
  align-items: center;
  ${DodamShape.Large};
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  > p {
    ${DodamTypography.Body2.Bold};
    text-align: center;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    > span {
      ${DodamTypography.Caption2.Regular};
    }
  }
`