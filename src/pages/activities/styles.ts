import styled, { css } from 'styled-components'

interface ActivityButtonProps {
  color: string
}

interface ActivityContainerProps {
  finished: boolean
}

export const ActivitiesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const ActivityContainer = styled.div<ActivityContainerProps>`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  background-color: var(--white);
  border-radius: 8px;
  border-left: 5px solid var(
    --${({ finished }) => (finished ? 'green-light' : 'blue')}
  );
`

export const ActivityDetails = styled.div`
  padding: 0.75rem;
  flex: 1;
`

export const ActivityTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export const ActivityDescription = styled.div`
  font-size: 1rem;
  text-align: justify;
  color: var(--dark);
  line-height: 1.25rem;
`

export const ActivityInfos = styled.div`
  width: 25%;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`

export const ActivityButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
  margin-bottom: 0.5rem;
`

export const ActivityCreatedAt = styled.div`
  font-size: 1rem;
`

export const ActivityStatus = styled.div`
  font-size: 1rem;
`

export const ActivityButton = styled.div<ActivityButtonProps>`
  padding: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: color 0.3s, background-color 0.3s;

  ${({ color }) => css`
    border: 2px solid var(--${color});
    color: var(--${color});

    &:hover {
      background-color: var(--${color});
      color: var(--white);
    }
  `}
`
