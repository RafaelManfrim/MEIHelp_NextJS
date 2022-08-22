import styled from 'styled-components'

export const MainStocksContainer = styled.div`
  width: 100%;
`

export const StocksContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const StocksContainerTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`
export const CreateStockButton = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  background-color: var(--light-blue);
  outline: var(--blue);
  border: var(--blue);
  border-radius: 0.25rem;
  color: var(--white);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`

export const StocksContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`

export const StockContainer = styled.div`
  background-color: var(--white);

  width: 100%;
  padding: 1rem;
  border-radius: 8px;
`
