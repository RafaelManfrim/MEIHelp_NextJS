import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  max-width: 100%;
`

export const WelcomeMessage = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`

export const TrainingsContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 656;
  padding: 2rem 0;
  border-bottom: 1px solid var(--gray);
  border-top: 1px solid var(--gray);
  margin-bottom: 1rem;
`

export const TrainingContainer = styled.div``

export const TrainingTitle = styled.strong`
  display: block;
  margin-top: 0.5rem;
`

export const TrainingDescription = styled.span`
  font-size: 0.875rem;
  color: var(--dark);
`

export const UsersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const UserContainer = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  background-color: var(--max-light-gray);
  border-left: 5px solid var(--blue);

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;

    &:last-child {
      text-align: right;
    }
  } 
`
