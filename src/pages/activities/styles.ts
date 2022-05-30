import styled from 'styled-components'

export const ActivitiesContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const ActivityContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    background-color: var(--white);
`

export const ActivityStatusColor = styled.div`
    width: 1%;
    background-color: var(--blue);
`

export const ActivityDetails = styled.div`
    width: 69%;
    padding: 0.5rem;
`

export const ActivityTitle = styled.div`
    font-size: 1.25rem;
`

export const ActivityDescription = styled.div`
    font-size: 0.85rem;
    text-align: justify;
`

export const ActivityInfos = styled.div`
    width: 30%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const ActivityCreatedAt = styled.div`
    font-size: 0.85rem;
`

export const ActivityStatus = styled.div`
    font-size: 0.85rem;
`

export const ActivityButtons = styled.div`
    display: flex;
    margin-top: 0.5rem;
    width: 50%;
    justify-content: space-around;
`

export const ActivityFinish = styled.div`
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--green);
    cursor: pointer;
    color: var(--green);
    border-radius: 0.25rem;
`

export const ActivityEdit = styled.div`
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--yellow);
    cursor: pointer;
    color: var(--yellow);
    border-radius: 0.25rem;
`

export const ActivityDelete = styled.div`
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--red);
    cursor: pointer;
    color: var(--red);
    border-radius: 0.25rem;
`
