import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 36rem;
  border-radius: 6px;
  padding: 1.5rem;
  background: var(--white);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: var(--black);
  padding: 0.25rem;
  border-radius: 16px;
  
  &:hover {
    background-color: var(--light-gray);
    transition: background-color 0.3s;
  }
`

export const Collums = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  flex: 1;
  gap: 0.25rem;

  label {
    font-size: 0.875rem;
    color: var(--dark-blue);
  }

  input, textarea {
    background-color: var(--max-light-gray);
    outline: none;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid var(--gray);
    font-size: 0.875rem;

    &:focus {
      border: 1px solid var(--blue);
    }
  }

  textarea {
    min-height: 10rem;
    resize: none;
  }

  span {
    font-size: 0.75rem;
    color: var(--red);
  }
`