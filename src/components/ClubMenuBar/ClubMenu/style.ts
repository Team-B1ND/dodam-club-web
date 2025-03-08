import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const ClubMenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  ${DodamShape.Large}
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamTypography.Headline.Bold}
  color: ${({ theme }) => theme.labelNormal};
`;

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
  padding: 20px 0;
  ${DodamShape.Large}
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  gap: 4px;
  p {
    ${DodamTypography.Caption1.Bold}
  }
`

export const ClubCreatePeriod = styled.span`
  ${DodamTypography.Caption2.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`

export const ClubDataIsNone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 20px 0;
  ${DodamTypography.Caption1.Bold}
  color: ${({ theme }) => theme.labelAlternative};
`