import Layout from 'src/components/Common/layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateClubPage from 'src/pages/CreateClub';
import MainPage from 'src/pages/Main';
import RegisterPage from 'src/pages/RegisterPage';
import ClubDetail from '@components/ClubDetail';

const Router = () => {
  return (
    <BrowserRouter basename="/club">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='/create' element={<CreateClubPage/>}/>
          {/* <Route path='/fix' element={<FixClubPage/>}/> */}
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/:id' element={<ClubDetail type='PAGE'/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default Router