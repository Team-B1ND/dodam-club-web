import { DodamShape, DodamTypography } from "@b1nd/dds-web"
import styled from "styled-components"

export const MemberListContainer = styled.div`
  width: 200px;
  height: 100%;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

export const ManagerMemberMain = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  & p {
    ${DodamTypography.Headline.Bold}
  }
`

export const MemberDescriptionContainer =  styled.div`
  ${DodamShape.Medium}
  color: ${({ theme }) => theme.labelNormal};
  border: 1px solid ${({ theme }) => theme.lineAlternative};
  padding: 20px;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`

export const ManageHandleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
`

export const ManageButtonBar = styled.div`
  display: flex;
  gap: 8px;
`