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
  background-color: #f5f5f5;
  border: transparent;
  width: 200px;
  height: 200px;
`

export const ClubItemInfoContainer = styled.div`
  display: flex;
  padding: 0px 6px;
  flex-direction: column;
`

export const ClubItemSubject = styled.p`
  ${DodamTypography.Label.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`

export const ClubItemNameState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ClubItemName = styled.p`
  color: ${({ theme }) => theme.labelNormal};
  ${DodamTypography.Heading2.Bold}
`

export const ClubItemDescription = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${DodamTypography.Body1.Medium}
  color: ${({ theme }) => theme.labelNormal};
`