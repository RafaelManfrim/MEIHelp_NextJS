import styled from 'styled-components'
import * as Tabs from '@radix-ui/react-tabs';
import * as Popover from '@radix-ui/react-popover';

export const TabsRoot = styled(Tabs.Root)`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TabsList = styled(Tabs.List)`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--gray);
  width: 100%;
`

export const TabsTrigger = styled(Tabs.Trigger)`
  padding: 0.5rem 1rem;
  border: 0;
  border-bottom: 2px solid var(--light-blue);
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  transition: all 0.3s ease;
  background: var(--max-light-gray);

  &[data-state="active"] {
    background: var(--light-blue);
    color: var(--white);
  }

  &:not([data-state="active"]):hover {
    background: var(--light-gray);
  }
`

export const TabsContent = styled(Tabs.Content)`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray);
  width: 100%;
`

export const CreateButtonContainer = styled.div`
  width: 100%;
  max-width: 768px;
`

export const ContentContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid var(--gray);
  border-radius: 6px;

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
`

export const ActionsTableData = styled.td`
  div {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }
`

export const ProvidersTableData = styled.td`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
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