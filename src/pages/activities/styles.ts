import styled, { css } from 'styled-components'

interface ActivityButtonProps {
  color: string
}

interface ActivityContainerProps {
  finished: boolean
}

export const MainContainer = styled.div`
  width: 100%;
  max-width: 100%;
`

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray);
  width: 100%;
`

export const ActivitiesContainer = styled.div`
  width: 100%;
  max-width: 768px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`

export const ActivityContainer = styled.div<ActivityContainerProps>`
  width: 100%;
  padding: 0.25rem;
  display: flex;
  margin-top: 1rem;
  background-color: var(--max-light-gray);
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
  font-size: 0.875rem;
  text-align: justify;
  color: var(--dark);
  line-height: 1.25rem;
`

export const ActivityInfos = styled.div`
  width: 30%;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--gray);
`

export const ActivityButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

export const ActivityCreatedAt = styled.div`
  font-size: 1rem;
`

export const ActivityStatus = styled.div`
  font-size: 1rem;
`

export const ActivityButton = styled.div<ActivityButtonProps>`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 999px;
  transition: background-color 0.2s;

  ${({ color }) => css`
    color: var(--${color});

    &:hover {
      background-color: var(--light-gray);
    }
  `}
`
