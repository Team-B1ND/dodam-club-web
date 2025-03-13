import styled from "styled-components";

export const ClubDataBox = styled.div`
  padding: 58px 0;
  width: 80%;
  height: 100%;
  flex-grow: 1;
  @media (max-width: 1069px){
    padding: 20px 0 72px 32px;
  } 
`
export const ClubSidebar= styled.div`
  width: 20%;
  padding: 58px 22px 58px 32px;
  @media (max-width: 1069px){
    padding: 20px 32px 72px 16px;
  } 
`

export const ClubBox = styled.div`
  display: flex;
  flex-grow: 1;
  @media (max-width: 1069px){
    width: 100%;
  }
`