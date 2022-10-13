import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { Stock as StockComponent } from '../../components/Stock'
import { CreateStockModal } from '../../components/Stock/Modals/Stock/CreateStockModal'
import { api } from '../../services/api'

import { CreateStockContainer, MainStocksContainer, SectionTitle, StocksContainer } from './styles'

export interface ProviderDTO {
  id: number
  name: string
  email: string
  phone: string
}

export interface ProductDTO {
  id: number
  product: {
    id: number
    providers: ProviderDTO[]
    name: string
    category: number
    description: string
  }
  quantity: number
}

export interface StockDTO {
  id: number
  name: string
  stock_products: ProductDTO[]
}

const Stock: NextPage = () => {
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
    <Base>
      <MainStocksContainer>
        <SectionTitle>
          Estoques
        </SectionTitle>
        <CreateStockContainer>
          <Dialog.Root open={isCreatingStock} onOpenChange={setIsCreatingStock}>
            <Dialog.Trigger asChild>
              <Button text='Criar estoque' />
            </Dialog.Trigger>
            <CreateStockModal closeModal={() => setIsCreatingStock(false)} onCreate={addStockToList} />
          </Dialog.Root>
        </CreateStockContainer>
        <StocksContainer>
          {stocks.map(stock => <StockComponent key={stock.id} stock={stock} onDelete={removeStockFromList} />)}
        </StocksContainer>
      </MainStocksContainer>
    </Base>
  )
}

export default Stock
