import Layout from '@components/Common/layout';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateClubPage from 'src/pages/CreateClub';
import MainPage from 'src/pages/Main';

import { useThemes } from "src/hooks/theme/usetheme";
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import styled from 'styled-components';

const Router = () => {
  const { handleTheme } = useThemes();
  const currentTheme = useRecoilValue(themeModeAtom);
  const Themechange = styled.button`
  border: 2px red;
  border-radius: 999px;
  position: absolute;
  width: 80px;
  height: 80px;
  right: 12px;
  bottom: 12px;
  cursor: pointer;
`
  return (
    <BrowserRouter basename="/club">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='/create' element={<CreateClubPage/>}/>
        </Route>
      </Routes>
      <Themechange onClick={handleTheme}>{currentTheme}</Themechange>
    </BrowserRouter>
  )

}

export default Router