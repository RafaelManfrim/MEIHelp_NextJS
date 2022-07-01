import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
`

export const TrainingsTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
`

export const TrainingsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 2rem;

    @media (max-width: 1100px) {
        justify-content: space-between;
    }
`

export const TrainingContainer = styled.div`
    width: 30%;
    aspect-ratio: 16 / 9;

    @media (max-width: 1415px) {
        width: 40%;
    }

    @media (max-width: 1000px) {
        width: 100%;
    }
`

export const TrainingTitle = styled.strong`
    display: block;
    margin-top: 0.5rem;
`

export const TrainingDescription = styled.span`
    font-size: 0.875rem;
    color: var(--dark);
`