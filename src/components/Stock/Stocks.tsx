import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { StockDTO, StockProductDTO } from '../../pages/stock';

import { Button } from '../Button';
import { Stock as StockComponent } from './components/Stock'
import { CreateStockModal } from './Modals/Stock/CreateStockModal';
import { api } from '../../services/api';

import { ContentContainer, CreateButtonContainer, SectionTitle } from "../../styles/pages/stock";

export function Stocks() {
  const [stocks, setStocks] = useState<StockDTO[]>([])
  const [isCreatingStock, setIsCreatingStock] = useState(false)

  function addStockToList(stock: StockDTO) {
    setStocks(oldStocks => [...oldStocks, stock])
  }

  function addProductToStock(stockId: number, stockProduct: StockProductDTO) {
    const updatedStocks = stocks.map(stock => {
      if (stock.id === stockId) {
        return {
          ...stock,
          stock_products: [...stock.stock_products, stockProduct]
        }
      }

      return stock
    })

    setStocks(updatedStocks)
  }

  function onEditProductAmount(stockId: number, stockProduct: StockProductDTO) {
    setStocks(oldStocks => oldStocks.filter(stock => {
      if (stock.id === stockId) {
        let editedStockProducts = stock.stock_products.map(stockProductFiltered => {
          if (stockProductFiltered.id !== stockProduct.id) {
            return stockProductFiltered
          } else {
            return stockProduct
          }
        })

        stock.stock_products = editedStockProducts
      }

      return stock
    }))
  }

  function onRemoveProductFromStock(stockId: number, productId: number) {
    setStocks(oldStocks => oldStocks.filter(stock => {
      if (stock.id === stockId) {
        let editedStockProducts = stock.stock_products.filter(stockProduct => stockProduct.product.id !== productId)

        stock.stock_products = editedStockProducts
      }

      return stock
    }))
  }

  function editStockInList(stockEdited: StockDTO) {
    setStocks(oldStocks => oldStocks.map(stock => stock.id === stockEdited.id ? stockEdited : stock))
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
      <ContentContainer>
        {stocks.map(stock => (
          <StockComponent
            key={stock.id}
            stock={stock}
            onAddProductToStock={addProductToStock}
            onEditProductAmount={onEditProductAmount}
            onRemoveProductFromStock={onRemoveProductFromStock}
            onEdit={editStockInList}
            onDelete={removeStockFromList}
          />
        ))}
      </ContentContainer>
    </>
  )
}
