import styled, {createGlobalStyle} from "styled-components";
import mainImg from './images/harry_background.jpg';
//@ts-ignore

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-image: url(${mainImg});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }
    
    * {
        box-sizing: border-box;
        font-family: 'Grape Nuts', sans-serif;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    > p {
        color: black;
    }
    
    .score {
        color: darkred;
        font-size: 2rem;
        margin: 0;
        font-weight: 900;
    }
    
    h1 {
        //font-size: 45px;
        background-image: linear-gradient(180deg, black, #87f1ff);
        background-size: 100%;
        background-clip: text;
        --webkit-background-clip: text;
        --webkit-text-fill-color: transparent;
        --moz-background-clip: text;
        --moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        text-align: center;
        margin: 20px;
    }
    
    .start, .next {
        cursor: pointer;
        //background: linear-gradient(180deg, black, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px;
        font-size: 25px;
        font-weight: 700;
    }
    
    .start {
        max-width: 200px;
    }

`
