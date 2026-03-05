import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const MenuItemContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

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
`;

export const ClubCreatePeriod = styled.span`
  ${DodamTypography.Caption2.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`;
