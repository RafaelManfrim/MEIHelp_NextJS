import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
`

export const ContentWrapper = styled.div`
  min-height: calc(100vh - 6rem);
  display: flex;
`

interface ContentProps {
  isSidebarExpanded: boolean
}

export const Content = styled.div<ContentProps>`
  margin: 2rem;
  width: 100%;
  max-width: calc(100vw - 4rem - ${({ isSidebarExpanded }) => isSidebarExpanded ? '20rem' : '2rem'});
  display: flex;
  background-color: var(--white);
  padding: 1rem;
  border-radius: 8px;
`
