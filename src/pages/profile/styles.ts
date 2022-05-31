import styled from 'styled-components'

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
`

export const NameContainer = styled.span`
    margin-top: 0.5rem;
    margin-bottom: 1rem;
`

export const DescriptionContainer = styled.textarea`
    resize: none;
    background: transparent;
    height: 10vh;
    outline: none;
    border: 1px solid var(--black);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
`

export const EmailContainer = styled.input`
    background: transparent;
    outline: none;
    border: 1px solid var(--black);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
`

export const PhoneContainer = styled.input`
    background: transparent;
    outline: none;
    border: 1px solid var(--black);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
`

export const CepContainer = styled.input`
    background: transparent;
    outline: none;
    border: 1px solid var(--black);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
`
