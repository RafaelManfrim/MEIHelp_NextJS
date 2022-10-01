import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray);
`

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 768px;
  margin-bottom: 1rem;

  p {
    text-align: center;
    margin-bottom: 0.5rem;
  }
`

export const NameContainer = styled.span`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`

export const DescriptionContainer = styled.textarea`
  resize: none;
  background-color: var(--max-light-gray);
  outline: none;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--gray);
  height: 10vh;

  &:focus {
    border: 1px solid var(--blue);
  }
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.5rem;
`

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const InputLabel = styled.label``

const BaseInput = styled.input`
  background-color: var(--max-light-gray);
  outline: none;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  flex: 1;
  border-radius: 8px;
  border: 1px solid var(--gray);

  &:focus {
    border: 1px solid var(--blue);
  }
`

export const EmailInput = styled(BaseInput)``

export const PhoneInput = styled(BaseInput)`
  max-width: 12rem;
`

export const CepInput = styled(BaseInput)`
  max-width: 12rem;
`

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`

export const DeleteAccountButton = styled.button`
  color: var(--red-light);
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: var(--dark-red);
  }

  &:disabled {
    color: var(--gray);
    cursor: not-allowed;
  }
`