import styled, { css } from "styled-components"

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
`

interface DasPaginationButtonProps {
  isCurrent: boolean
}

export const DasPaginationButton = styled.button<DasPaginationButtonProps>`
  background: var(--light-gray);
  border: 0;
  overflow: hidden;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  color: var(--dark-blue);

  ${({ isCurrent }) => isCurrent && css`
    background-color: var(--blue);
    color: var(--white);
  `}

  &:hover {
    filter: brightness(0.9);
  }
`