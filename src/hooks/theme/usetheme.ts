import { useCallback, useMemo } from "react";
import { THEME_KEY } from "src/constants/theme/theme.contant";
import { ETheme } from "src/enum/theme/theme.enum";
import { useRecoilState } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";

/**
 * 다크 모드를 관리하는 커스텀 훅
 */
export const useThemes = () => {
    const [currentTheme, setCurrentTheme] = useRecoilState<ETheme>(themeModeAtom);

    const themeColor = useMemo((): ETheme => {
      return currentTheme === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT;
    }, [currentTheme]);

    const handleTheme = useCallback((): void => {
      const switchTheme = currentTheme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;
      window.localStorage.setItem(THEME_KEY, switchTheme);
      setCurrentTheme(switchTheme);
    }, [currentTheme, setCurrentTheme]);

    return {
      themeColor,
      handleTheme,
    };
};