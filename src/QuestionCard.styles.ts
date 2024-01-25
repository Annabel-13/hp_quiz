import styled from "styled-components";


export const Wrapper = styled.div `
    max-width: 1100px;
    background: #ebfeff;
    border-radius: 10px;
    border: 2px solid darkred;
    padding: 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    
    p {
        font-size: 1.8rem;
        
    }
`

type ButtonWrapperProps = {
    correct: boolean;
    clicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`

    :hover {
        opacity: 0.8;
    }
    
    button {
        cursor: pointer;
        user-select: none;
        font-size: 1.8rem;
        width: 100%;
        height: 40px;
        margin: 5px 0;
        background: ${({correct, clicked}) =>
            correct
            ? 'linear-gradient(90deg, #56ffa4, green)' 
            : !correct && clicked
            ? 'linear-gradient(90deg, #ff5656, #c16868)'
            : 'linear-gradient(90deg, #56ccff, #6eafb4)'};
        border: 3px solid #fff;
        box-shadow: 1px 2px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        color: black;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    }
`;
