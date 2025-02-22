import styled from "styled-components";

export const main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 58px 32px;
  gap: 32px;
`

export const clubMenubar = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  overflow-y: scroll;
`

export const exampleSidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundNormal};
`

export const themechange = styled.button`
  border: 2px red;
  border-radius: 999px;
  position: absolute;
  width: 80px;
  height: 80px;
  right: 12px;
  bottom: 12px;
  cursor: pointer;
`