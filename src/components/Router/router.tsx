import Layout from '../Common/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageClubPage from 'src/pages/ManageClub';
import MainPage from 'src/pages/Main';
import RegisterPage from 'src/pages/RegisterPage';
import ClubDetail from 'src/components/ClubDetail';

const Router = () => {
  return (
    <BrowserRouter basename="/club">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='create' element={<ManageClubPage/>}/>
          <Route path='edit/:clubId' element={<ManageClubPage/>}/>
          <Route path='/:id' element={<ClubDetail type='PAGE'/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router