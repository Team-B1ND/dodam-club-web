import styled from 'styled-components';
import { April_Fools_Day_Theme } from 'src/styles/theme';

export const main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  gap: 32px;
  background-color: ${({ theme }) => theme.backgroundNeutral};
`

export const exampleSidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundNormal};
`
export const PageTemplateContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  background-color: ${({ theme }) => theme.backgroundNeutral};

  & > div > div {
    // 로고 색 바꾸기
    & > div:nth-child(1) > svg > path {
      fill: ${April_Fools_Day_Theme.primaryNormal};
    }

    // 선택된거 배경색 변경
    & > div:nth-child(2) > div > a:nth-child(8) {
      background-color: ${April_Fools_Day_Theme.primaryNormal};
    }
  }
`;