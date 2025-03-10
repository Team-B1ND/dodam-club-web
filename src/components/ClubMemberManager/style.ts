import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const ClubManager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 58px 0;
  flex-grow: 1;
`

export const ClubManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  height: 640px;
  background-color: ${({ theme }) => theme.backgroundNormal };
  padding: 20px;
  ${DodamShape.Large}
  overflow: hidden;
`

export const ClubManagerMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 16px;
`

export const ClubManagerSelecter = styled.select`
  display: flex;
  padding: 0 12px;
  ${DodamShape.Medium}
  ${DodamTypography.Body2.Bold}
  background-color: transparent;
  color: ${({ theme }) => theme.labelNormal};
  border: 1px ${({ theme }) => theme.lineAlternative} solid;
  width: 160px;
  height: 48px;
  outline: none;
  appearance: none;
`

export const ClubManagerInfoContainer = styled.div`
  display: flex;
  padding: 0 20px;
  flex-grow: 1;
  width: 100%;
  height: 420px;
`