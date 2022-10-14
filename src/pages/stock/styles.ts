import styled from 'styled-components'
import * as Tabs from '@radix-ui/react-tabs';

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

export const StocksContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`
