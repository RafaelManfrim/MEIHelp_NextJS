import styled from 'styled-components'

export const MainContainer = styled.div``

export const TrainingsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

export const Training = styled.div`
    margin: 1.5rem 2rem 0 0;
    width: 30%;
    height: 300px;

    @media (max-width: 1415px) {
        width: 45%;
    }
`

export const TrainingsTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`