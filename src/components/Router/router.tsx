import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from '@components/Main';

const Router = () => {
  return (
    <BrowserRouter basename="/club">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router