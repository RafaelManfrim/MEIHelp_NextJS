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
  font-size: 1rem;
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
  border: 1px solid var(--dark);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
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
  background: transparent;
  outline: none;
  border: 1px solid var(--dark);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  flex: 1;
`

export const EmailInput = styled(BaseInput)``

export const PhoneInput = styled(BaseInput)`
  max-width: 12rem;
`

export const CepInput = styled(BaseInput)`
  max-width: 12rem;
`
