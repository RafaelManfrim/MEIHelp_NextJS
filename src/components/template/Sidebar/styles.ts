import styled from 'styled-components'

export const SidebarContainer = styled.div`
  background-color: var(--light-blue);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SidebarMenuArea = styled.div`
  min-height: 100%;
  padding: 3rem;
  padding-top: 1rem;
  min-width: 18rem;
  max-width: 20rem;
`

export const SidebarArrowArea = styled.div`
  min-height: 100%;
  padding: 0 0.5rem;
  padding-top: calc(50vh - 4rem);
  cursor: pointer;
  transition: filter 0.25s;
  background-color: var(--light-blue);
  color: var(--white);

  &:hover {
    filter: brightness(0.95);
  }
`
