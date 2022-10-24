import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray);
`

export const DasTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid var(--gray);
  overflow-x: auto;

  thead {
    background-color: var(--light-blue);
  }

  thead th {
    color: var(--white);
    padding: 1rem;
  }

  tbody tr:nth-child(2n) {
    background-color: var(--max-light-gray);
  }

  tbody td {
    padding: 0.75rem;
    text-align: center;
    width: 9%;

    &:first-child {
      width: 19%;
    }

    a {
      color: var(--blue);
      text-decoration: none;
    }
  }
`

interface DasSituationProps {
  situacao: string
}

export const DasSituation = styled.td<DasSituationProps>`
  color: ${props => props.situacao === 'A Vencer' ? 'var(--blue)' : props.situacao === 'Liquidado' ? 'var(--green-light)' : 'var(--red)'};

  font-weight: bold;
`