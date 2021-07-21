import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        font-family: 'Josefin Sans', sans-serif;
        width: 100%;
        height: 100%;
        background-color: hsl(0, 0%, 97%);
        color: hsl(0, 0%, 10%);
    }
`;

export default GlobalStyle;