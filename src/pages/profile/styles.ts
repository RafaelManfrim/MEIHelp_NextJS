import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    max-width: 1000px;
`

export const ProfileTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    font-size: 1.25rem;
`

export const NameContainer = styled.span`
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
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
