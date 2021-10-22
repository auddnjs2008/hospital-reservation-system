import { createGlobalStyle } from "styled-components";
import Nano from "src/lib/styles/font/NanumGothic-Regular.ttf";
import NanoBold from "src/lib/styles/font/NanumGothic-Bold.ttf";
import NanoExtra from "src/lib/styles/font/NanumGothic-ExtraBold.ttf";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    @font-face{
        font-family:"Nano";
        font-weight:400;
        src:url(${Nano}) format("truetype");
    }

    @font-face{
        font-family:"Nano";
        font-weight:700;
        src:url(${NanoBold}) format("truetype");
    }
    
    @font-face{
        font-family:"Nano";
        font-weight:800;
        src:url(${NanoExtra}) format("truetype");
    }

    
    body{
        width:100vw;
        height:100vh;
        overflow-x:hidden;
    }
    *{
        box-sizing:border-box;
        font-family:"Nano";
        
    }
    a{
        text-decoration:none;
        color:inherit;
    }



`;

export default GlobalStyles;
