import { DodamTypography } from "@b1nd/dds-web";
import styled from "styled-components";

export const ClubListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${DodamTypography.Label.Bold}
  color: ${({ theme }) => theme.labelAlternative};
`