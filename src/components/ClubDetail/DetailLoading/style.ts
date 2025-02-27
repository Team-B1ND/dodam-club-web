import { DodamShape } from "@b1nd/dds-web";
import styled from "styled-components";

export const DetailSkelletonContainer = styled.div<{ $type: "MODAL" | "PAGE"}>`
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
  z-index: 99;
`