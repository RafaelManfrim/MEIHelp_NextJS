import styled from 'styled-components'

interface ButtonProps {
  color?: string
}

export const ButtonComponent = styled.button<ButtonProps>`
  padding: 0 2rem;
  height: 2.5rem;
  background-color: var(--${({ color }) => color || 'light-blue'});
  outline: var(--blue);
  border: var(--blue);
  border-radius: 0.25rem;
  color: var(--white);
  font-weight: bold;
  width: 100%;

  &:hover {
    filter: brightness(0.9);
  }
`
