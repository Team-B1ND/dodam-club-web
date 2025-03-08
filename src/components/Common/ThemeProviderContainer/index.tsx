import { ReactNode } from "react";
import { DodamThemeProvider,DodamGlobalStyles } from "@b1nd/dds-web";
import { useThemes } from "src/hooks/theme/usetheme";
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";

type Props = {
  children: ReactNode;
};

const ThemeProviderContainer = ({ children }: Props) => {
  const { themeColor } = useThemes();
  const currentTheme = useRecoilValue(themeModeAtom);
  
  return (
    <DodamThemeProvider theme={themeColor} data-color-mode={currentTheme.toLowerCase()}>
      <DodamGlobalStyles />
      {children}
    </DodamThemeProvider>
  );
};

export default ThemeProviderContainer;
