import styled, { css } from 'styled-components'

interface ActivityButtonProps {
    color: string;
}

interface ActivityStatusColorProps {
    finished: boolean;
}

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

export const ActivityStatusColor = styled.div<ActivityStatusColorProps>`
    width: 1%;
    background-color: var(--${({ finished }) => finished ? 'green-light' : 'blue'});
`

export const ActivityDetails = styled.div`
    width: 69%;
    padding: 0.5rem;
`

export const ActivityTitle = styled.div`
    font-size: 1.40rem;
    font-weight: bold;
    padding: 0.5rem;
`

export const ActivityDescription = styled.div`
    font-size: 0.88rem;
    text-align: justify;
    color: var(--dark);
    line-height: 1.25rem;
    padding: 0.5rem;
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
    font-size: 1rem;
    text-align: center;
`

export const ActivityStatus = styled.div`
    text-align: center;
    font-size: 1rem;
    margin: 0.5rem 0;
`

export const ActivityButtons = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-around;
`

export const ActivityButton = styled.div<ActivityButtonProps>`
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.3s;

    ${({ color }) => css`
        border: 2px solid var(--${color});
        color: var(--${color});

        &:hover {
            background-color: var(--${color});
            color: var(--white);
        }
    `}
`
