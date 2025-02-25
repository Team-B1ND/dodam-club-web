import { DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const MemberItemContainer = styled.div`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`

export const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${DodamTypography.Label.Bold}
  color: ${({ theme }) => theme.labelNormal};
`

export const MemberGradeAndRoom = styled.div`
  ${DodamTypography.Caption2.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`

export const MemberItemBar = styled.div`
  flex-grow: 1;
`