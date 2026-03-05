import { DodamFilledButton, DodamShape, DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 24px;
  gap: 20px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  ${DodamShape.Large}
  ${DodamTypography.Heading1.Bold}
  color: ${({ theme }) => theme.labelNormal};
`;

export const Section = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-grow: 1;
  ${DodamTypography.Headline.Medium}
  color: ${({ theme }) => theme.labelAlternative};
`;

export const ClubListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

export const IntroductionTextarea = styled.textarea`
  flex-grow: 1;
  ${DodamTypography.Body2.Regular}
  color: ${({ theme }) => theme.labelNormal};
  border: ${({ theme }) => theme.lineAlternative} 1px solid;
  ${DodamShape.Small}
  background-color: ${({ theme }) => theme.backgroundNormal};
  resize: none;
  outline: none;
  padding: 24px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`

export const SubmitButton = styled(DodamFilledButton)`
  min-height: 48px;
`