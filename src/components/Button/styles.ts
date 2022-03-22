import styled from "styled-components"

export const ButtonComponent = styled.button`
    padding: 0 2rem;
    height: 2.5rem;
    background-color: var(--light-blue);
    outline: var(--blue);
    border: var(--blue);
    border-radius: 0.25rem;
    color: var(--white);
    font-weight: bold;
    width: 100%;

    &:hover {
        filter: brightness(0.9);
    }
`
