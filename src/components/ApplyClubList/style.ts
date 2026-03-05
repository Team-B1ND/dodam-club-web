import { DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  flex-grow: 1;
  ${DodamShape.Large};
  border: ${({ theme }) => theme.lineAlternative} 1px solid;
  overflow: hidden;
`

export const ClubItem = styled.button<{
  $selected: string;
}>`
  outline: none;
  background-color: ${({ $selected, theme }) => $selected === "true" ? theme.backgroundNeutral : "transparent" };
  border: none;
  text-align: start;
  width: 100%;
  padding: 16px 24px;
  ${DodamTypography.Headline.Bold};
  color: ${({ theme }) => theme.labelNormal};
  cursor: pointer;
  &:hover{
    background-color: ${({ theme }) => theme.backgroundNeutral};
  }
  transition: all 0.2s linear;
`