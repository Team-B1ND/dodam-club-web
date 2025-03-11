import styled from "styled-components";
import { DodamShape, DodamTypography } from "@b1nd/dds-web";

export const ClubItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
  height: fit-content;
  cursor: pointer;
`

export const ClubItemImage = styled.img`
  ${DodamShape.Medium}
  border: transparent;
  width: 200px;
  height: 200px;
  object-fit:cover;
`

export const ClubItemInfoContainer = styled.div`
  display: flex;
  padding: 0px 6px;
  flex-direction: column;
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${DodamTypography.Body1.Medium}
    color: ${({ theme }) => theme.labelNormal};
  }
  > span {
    ${DodamTypography.Label.Medium}
    color: ${({ theme }) => theme.labelAlternative};
  }
`

export const ClubItemNameState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    color: ${({ theme }) => theme.labelNormal};
    ${DodamTypography.Heading2.Bold}
  }
`