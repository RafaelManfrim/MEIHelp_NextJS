import styled from 'styled-components'

export const HeaderContainer = styled.div`
  background-color: var(--blue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 0 3rem;
`

export const LogoArea = styled.div`
  display: block;
  height: 5rem;
  width: 15rem;
`

export const ActionsArea = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderButton = styled.button`
  padding: 0 2rem;
  height: 2.5rem;
  margin-left: 0.75rem;
  background-color: var(--light-blue);
  outline: var(--blue);
  border: var(--blue);
  border-radius: 0.25rem;
  color: var(--white);
  font-weight: bold;

  &:hover {
    filter: brightness(0.9);
  }
`

export const InfoArea = styled.div`
  margin-right: 1rem;
  font-size: 1rem;
  color: var(--dark-blue);
  display: flex;
`

export const UserAccountButton = styled.span`
  cursor: pointer;

  &:hover {
    color: var(--black);
  }
`

export const LogoutButton = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--red);
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`

export const LogoutButtonText = styled.span`
  margin-left: 0.25rem;
  color: var(--gray);
  font-size: 1rem;
`
