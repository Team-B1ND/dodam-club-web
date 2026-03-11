import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const MenuItemContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundNormal};
  padding: 16px;
  ${DodamShape.Large};
  > p {
    ${DodamTypography.Headline.Bold}
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    > p {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }
  }
`;

export const MyClubIsNone = styled.div`
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
`;