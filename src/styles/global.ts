import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --white: #FFFFFF;
        --light-gray: #E9E7E7;
        --gray: #CCD1D3;
        --dark-gray: #92A5AD;
        --dark: #262626;
        --light-blue: #4293C9;
        --blue: #276096;
        --dark-blue: #030F1B;
        --black: #000000;
        --red-light: #FF6347;
        --red: #B80F0A;
        --red-dark: #900603;
        --green-light: #126E39;
        --green: #0A4021;
        --yellow: #EFCB68;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        background: var(--light-gray);
        --webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: Arial, sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background: var(--white);
        padding: 3rem;
        position: relative;
        border-radius: 0.5rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
    }
`