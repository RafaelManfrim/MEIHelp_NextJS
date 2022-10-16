import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { X } from 'phosphor-react';

import { Button } from '../../../Button';
import { api } from '../../../../services/api';
import { ProductDTO, StockDTO, StockProductDTO } from '../../../../pages/stock';

import { CloseButton, Collums, Content, FormGroup, Overlay } from '../styles';

interface AddProductToStockModalProps {
  stock: StockDTO;
  closeModal: () => void;
  onAdd: (stockId: number, stockProduct: StockProductDTO) => void
}

export function AddProductToStockModal({ stock, closeModal, onAdd }: AddProductToStockModalProps) {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  const productsInStock = stock.stock_products.map(stockProduct => stockProduct.product.id)

  async function handleCreateStock() {
    try {
      const response = await api.post('/stock_product/add_product/', {
        quantity,
        product_id: selectedProductId,
        stock_id: stock.id
      })
      onAdd(stock.id, response.data)
      toast.success('Produto adicionado com sucesso!')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao adicionar o produto ao estoque')
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products/')
        setProducts(response.data)
      } catch (err) {
        console.log(err)
        toast.error('Houve um erro ao carregar os produtos disponíveis')
      }
    }

    fetchProducts()
  }, [])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Criar estoque</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>
        <Collums>
          <FormGroup>
            <label htmlFor="produto">Produto</label>
            <select name="produto" id="produto" value={String(selectedProductId)} onChange={(e) => setSelectedProductId(Number(e.target.value))}>
              <option value="null">Selecione um produto</option>
              {products.map(product => !productsInStock.includes(product.id) && (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="quantity">Quantidade:</label>
            <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </FormGroup>
        </Collums>
        <Collums style={{ marginTop: 16 }}>
          <Dialog.Close asChild>
            <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
          </Dialog.Close>
          <Button text="Adicionar" type="button" color="green-light" disabled={!selectedProductId || quantity < 1} onClick={handleCreateStock} />
        </Collums>
      </Content>
    </Dialog.Portal>
  )
}