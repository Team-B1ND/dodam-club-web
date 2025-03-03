import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const ClubMenuContainer = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  ${DodamShape.Large}
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamTypography.Headline.Bold}
  color: ${({ theme }) => theme.labelNormal};
`

export const MyClubList = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`

export const MyClubIsNone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  ${DodamShape.Large}
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  ${DodamTypography.Body2.Bold}
  gap: 4px;
`

export const ClubCreatePeriod = styled.p`
  ${DodamTypography.Caption1.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`