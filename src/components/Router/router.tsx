import Layout from 'src/components/Common/layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageClubPage from 'src/pages/ManageClub';
import MainPage from 'src/pages/Main';
import ClubDetail from '@components/ClubDetail';

const Router = () => {
  return (
    <BrowserRouter basename="/club">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='create' element={<ManageClubPage/>}/>
          <Route path='edit/:clubId' element={<ManageClubPage/>}/>
          <Route path='/:id' element={<ClubDetail type='PAGE'/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default Router