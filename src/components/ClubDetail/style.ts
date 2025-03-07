import { DodamColor, DodamShape, DodamTypography } from "@b1nd/dds-web";
import { ClubDetailType } from "src/types/club/club.type";
import styled from "styled-components";

export const ClubDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 58px 0;
  flex-grow: 1;
`

export const ClubDetailContainer = styled.div<{ $type: ClubDetailType }>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: ${({ $type }) => $type === "MODAL" ? '920px' : 'full-contents'};
  ${({ $type }) => $type === "PAGE" && {'flexGrow':'1'}}
  height: ${({ $type }) => $type === "MODAL" ? '640px' : "100%"};
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamShape.Large}
  gap: 20px;
  overflow-y: scroll;
  z-index: 3;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

export const ClubDetailHeader = styled.div`
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: end;
  p {
    ${DodamTypography.Label.Medium}
    color: ${({ theme }) => theme.labelNormal};
  }
`

export const ClubDetailHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: fit-content;
  height: fit-content;
`

export const ClubDetailHeaderSubject = styled.div`
  ${DodamTypography.Body2.Medium};
  color: ${({ theme }) => theme.labelAlternative};
`

export const ClubDetailHeaderName = styled.div`
  display: flex;
  align-items: center;
  ${DodamTypography.Title1.Bold};
  color: ${({ theme }) => theme.labelNormal};
  gap: 8px;
`

export const ClubDetailHeaderShortDescription = styled.div`
  ${DodamTypography.Heading1.Medium};
  color: ${({ theme }) => theme.labelNormal};
`

export const ClubDetailMainContainer = styled.div`
  display: flex;
  padding: 0 20px;
  gap: 20px;
  height: 100%;
`

export const ClubDeatilMemberList = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  color: ${({ theme }) => theme.labelAlternative};
  ${DodamTypography.Body2.Bold}
`

export const ClubDetailDescription = styled.div`
  display: flex;
  flex-grow: 1;
  height: fit-content;
  min-height: 600px;
  gap: 4px;
  flex-direction: column;
  color: ${({ theme }) => theme.labelAlternative};
  ${DodamTypography.Body2.Bold}
`

export const ClubDetailMarkDownViewer = styled.div`
  ${DodamShape.Small}
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  flex-grow: 1;
  padding: 20px;
`

export const ClubDetailMenu = styled.div`
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: end;
`

export const ClubDetailMenuInfoAndButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${DodamTypography.Body2.Bold}
  color: ${({ theme }) => theme.labelAlternative};
`

export const ClubDetailMenuButton = styled.div`
  display: flex;
  gap: 8px;
`

export const ClubDetailEditButton = styled.button`
  display: flex;
  ${DodamShape.Medium}
  padding: 8px;
  border: none;
  background-color: ${DodamColor.blue50};
  cursor: pointer;
`