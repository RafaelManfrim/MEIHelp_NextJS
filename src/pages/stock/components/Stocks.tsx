import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { StockDTO } from '..';

import { Button } from '../../../components/Button';
import { Stock as StockComponent } from '../../../components/Stock'
import { CreateStockModal } from '../../../components/Stock/Modals/Stock/CreateStockModal';
import { api } from '../../../services/api';

import { CreateButtonContainer, SectionTitle, StocksContainer } from "../styles";

export function Stocks() {
  const [stocks, setStocks] = useState<StockDTO[]>([])
  const [isCreatingStock, setIsCreatingStock] = useState(false)

  function addStockToList(stock: StockDTO) {
    setStocks(oldStocks => [...oldStocks, stock])
  }

  function removeStockFromList(id: number) {
    setStocks(oldStocks => oldStocks.filter(stock => stock.id !== id))
  }

  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await api.get('/stocks/')
        setStocks(response.data)
      } catch (error) {
        console.log(error)
        toast.error('Houve um erro ao carregar sua lista de estoques.')
      }
    }

    fetchStocks()
  }, [])

  return (
    <>
      <SectionTitle>Estoques</SectionTitle>
      <CreateButtonContainer>
        <Dialog.Root open={isCreatingStock} onOpenChange={setIsCreatingStock}>
          <Dialog.Trigger asChild>
            <Button text='Criar estoque' />
          </Dialog.Trigger>
          <CreateStockModal closeModal={() => setIsCreatingStock(false)} onCreate={addStockToList} />
        </Dialog.Root>
      </CreateButtonContainer>
      <StocksContainer>
        {stocks.map(stock => <StockComponent key={stock.id} stock={stock} onDelete={removeStockFromList} />)}
      </StocksContainer>
    </>
  )
}
