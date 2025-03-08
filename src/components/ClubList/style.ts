import styled from "styled-components";
import { DodamShape, DodamTypography, } from "@b1nd/dds-web";

export const ClubListContainer = styled.div`
  flex-grow: 1;
  width: fit-content;
  margin: 58px 0;
  ${DodamShape.Large};
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ClubListHead = styled.p`
  ${DodamTypography.Heading1.Bold}
  width: fit-content;
`

export const ClubItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 16px;
  overflow-y: scroll;

  @media only screen and (max-width: 1250px){
    grid-template-columns: repeat(3, 1fr);
  } 
  @media only screen and (max-width: 960px){
    grid-template-columns: repeat(2, 1fr);
  } 
  @media only screen and (max-width: 740px){
    grid-template-columns: repeat(1, 1fr);
  } 
`

export const ClubMenu = styled.div`
  width: fit-content;
  padding: 16px 0;
  z-index: 1;
`