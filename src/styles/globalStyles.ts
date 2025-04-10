import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-display: swap;
    }

    a {
      text-decoration: none;
    }

`;

export default GlobalStyles;