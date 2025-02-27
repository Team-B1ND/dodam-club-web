import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";
import { hexToRgba } from '@b1nd/dds-web';

export const CreateClubContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-grow: 1;
  ${DodamShape.Large}
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  padding: 24px;
`

export const CreateClubHeader = styled.p`
  padding: 12px 12px 0;
  ${DodamTypography.Heading1.Bold}
`

export const CreateClubForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 12px 60px ;
`

export const CreateClubSubmit = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  width: fit-content;
  z-index: 100;
`

export const CreateClubCustomInputContainer = styled.div<{ $isError: boolean; }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  ${DodamTypography.Label.Medium}
  color: ${({ theme, $isError }) => $isError ? theme.labelAlternative : theme.statusNegative};
  white-space: pre-line;
`

export const CreateClubCustomInput = styled.div<{ $isError: boolean; }>`
  width: 100%;
  height: 56px;
  ${DodamShape.Medium}
  border: 1px ${({ theme, $isError }) => $isError ? theme.lineAlternative : theme.statusNegative} solid;
  background-color: ${({ theme, $isError }) => $isError ? hexToRgba(theme.backgroundNormal, 0.65) : hexToRgba('#E52222', 0.03)};
`

export const PreviewClubImage = styled.img`
  width: 30%;
  max-width: 240px;
  aspect-ratio: 1;
  ${DodamShape.Medium}
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
`

export const CreateClubCustomInputDivider = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 16px;
`

export const CreateClubMemberContainer = styled.div<{ $isError: boolean; }>`
  display: flex;
  width: 100%;
  ${DodamShape.Medium}
  border: 1px ${({ theme, $isError }) => $isError ? theme.lineAlternative : theme.statusNegative} solid;
  height: 600px;
  padding: 16px;
  gap: 16px;
`

export const CreateClubMemberSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`

export const CreateClubMemberList = styled.div`
  ${DodamShape.Small}
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  background-color: transparent;
  height: 100%;
  padding: 8px 12px;
`

export const CreateClubMemberSelected = styled.div`
  display: flex;
  flex-direction: column;
  ${DodamShape.Small}
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  background-color: transparent;
  height: 100%;
  width: 50%;
  padding: 8px 12px;
`

export const CreateClubTypeSelect = styled.select<{ $isError: boolean; }>`
  width: 100%;
  height: 56px;
  ${DodamShape.Medium}
  ${DodamTypography.Headline.Medium}
  border: 1px ${({ theme, $isError }) => $isError ? theme.lineAlternative : theme.statusNegative} solid;
  background-color: ${({ theme, $isError }) => $isError ? hexToRgba(theme.backgroundNormal, 0.65) : hexToRgba('#E52222', 0.03)};
  color: ${({ theme }) => theme.labelAlternative};
  padding: 0 16px;
  cursor: pointer;
  outline: none;
  appearance: none;
`