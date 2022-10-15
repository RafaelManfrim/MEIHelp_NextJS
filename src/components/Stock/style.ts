import styled from 'styled-components'
import * as Popover from '@radix-ui/react-popover';

export const StockComponentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-radius: 6px;
`

export const StockComponentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: var(--light-gray);
  padding: 0.75rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  strong {
    font-size: 1.25rem;
  }

  p {
    font-size: 1.125rem;
  }
`

export const StockComponentContent = styled.div`
  padding: 0.75rem;
  width: 100%;
  border: 1px solid var(--light-gray);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid var(--gray);
    border-radius: 6px;
    margin: 1rem 0;

    thead {
      tr {
        background-color: var(--light-blue);

        th {
          padding: 0.5rem;
          color: var(--white);
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.5rem;
          text-align: center;
        }

        &:nth-child(odd) {
          background-color: var(--max-light-gray);
        }
      }
    }
  }
`

export const StockComponentContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 1.25rem;
  }
`

export const StockComponentContentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`

export const ProvidersTableData = styled.td`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
`

export const ActionsTableData = styled.td`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`

export const PopoverContent = styled(Popover.Content)`
  background-color: var(--white);
  border: 1px solid var(--gray);
  border-radius: 6px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 256px;
`

export const PopoverClose = styled(Popover.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1rem;
  right: 1rem;
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