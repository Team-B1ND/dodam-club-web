import styled from "styled-components";
import { DodamShape, DodamTypography, } from "@b1nd/dds-web";

export const ClubListContainer = styled.div`
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  ${DodamShape.Large};
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.labelNormal};
  gap: 20px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
`

export const ClubListHead = styled.p`
  ${DodamTypography.Heading1.Bold}
  width: 100%;
`

export const ClubItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 16px;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 1420px){
    grid-template-columns: repeat(3, 1fr);
  } 
  @media only screen and (max-width: 1220px){
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

export const NoClubMessage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${DodamTypography.Body1.Medium};
  color: ${({ theme }) => theme.labelNormal};
`;
