import React from 'react'
import * as S from './style'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <S.main>
      <S.exampleSidebar />
      <Outlet/>
    </S.main>
  )
}

export default Layout