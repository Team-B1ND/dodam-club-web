import * as S from './styles'
import { Outlet } from 'react-router-dom'
import { DodamNavBar } from '@b1nd/dds-web'
import { useRecoilValue } from "recoil";
import { useThemes } from "src/hooks/theme/usetheme";
import { themeModeAtom } from "src/store/theme/themeStore";
import useLogout from 'src/hooks/auth/useLogout';

const Layout = () => {
  const { handleTheme } =useThemes();
  const currentTheme = useRecoilValue(themeModeAtom);
  const {logOut} = useLogout()

  return (
    <S.main>
      <DodamNavBar 
        location="club" 
        handleTheme={handleTheme} 
        logout={logOut}
        currentTheme={currentTheme}/>
      <Outlet/>
    </S.main>
  )
}

export default Layout