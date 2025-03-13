import styled from 'styled-components';

export const main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  gap: 10px;
  background-color: ${({ theme }) => theme.backgroundNeutral};
`

export const exampleSidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundNormal};
`