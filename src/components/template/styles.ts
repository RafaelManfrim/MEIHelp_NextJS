import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
`

export const ContentWrapper = styled.div`
  min-height: calc(100vh - 6rem);
  display: flex;
`

export const Content = styled.div`
  margin: 2rem;
  width: 100%;
  max-width: calc(100vw - 20rem - 4rem);
  display: flex;
  background-color: var(--white);
  padding: 1rem;
  border-radius: 8px;
`
