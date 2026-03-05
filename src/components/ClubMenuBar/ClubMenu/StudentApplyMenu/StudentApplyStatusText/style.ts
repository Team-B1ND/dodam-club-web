import { DodamTypography } from "@b1nd/dds-web";
import { ClubStatus } from "src/types/club/club.type";
import styled from "styled-components";

export const TextContainer = styled.div<{
  $status: ClubStatus;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  padding: 0 12px;
  background-color: ${({ $status, theme }) =>
    $status === "PENDING"
      ? theme.primaryAlternative
      : $status === "REJECTED"
        ? theme.statusNegative
        : $status === "ALLOWED"
          ? theme.primaryNormal
          : ""};
  color: ${({ theme }) => theme.staticWhite};
  ${DodamTypography.Caption2.Bold};
  border-radius: 8px;
`;
