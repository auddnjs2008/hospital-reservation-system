import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    
    body{
        width:100vw;
        height:100vh;
        overflow-x:hidden;
    }
    *{
        box-sizing:border-box;
    }
    a{
        text-decoration:none;
        color:inherit;
    }



`;

export default GlobalStyles;
