import styled from "styled-components";

export const ClubDataBox = styled.div`
  padding: 58px 0;
  display: flex;
  flex-grow: 1;
  height: 100%;
  min-width: 0;
  @media (max-width: 1069px) {
    padding: 20px 0 72px 32px;
  }
`;
export const ClubSidebar= styled.div`
  min-width: 280px;
  padding: 58px 32px;
  @media (max-width: 1069px){
    padding: 20px 32px 72px 24px;
  } 
`

export const ClubBox = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: 0;
`;