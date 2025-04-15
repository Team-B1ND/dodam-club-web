import { ReactNode } from "react";
import {useThemes} from "src/hooks/theme/usetheme";
import {  DodamGlobalStyles, DodamThemeProvider } from "@b1nd/dds-web";



interface Props {
  children: ReactNode;
}

const ThemeProviderContainer = ({ children }: Props) => {
  const { themeColor } = useThemes();

  return (
    <DodamThemeProvider theme={themeColor}>
      <DodamGlobalStyles />
      {children}
    </DodamThemeProvider>
  );
};
export default ThemeProviderContainer;