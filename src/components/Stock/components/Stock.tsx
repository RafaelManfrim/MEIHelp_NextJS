import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { CaretDown, CaretUp, X } from "phosphor-react"
import { useState } from "react"
import toast from 'react-hot-toast';

import { StockDTO } from "../../../pages/stock"
import { api } from '../../../services/api';
import { phoneMask } from '../../../utils/masks';
import { Button } from "../../Button"
import { ConfirmStockExclusionModal } from '../Modals/Stock/ConfirmExclusion';
import { EditStockModal } from '../Modals/Stock/EditStockModal';
import { RemoveProductFromStockModal } from '../Modals/Stock/RemoveProductFromStock';

import {
  ActionsTableData,
  PopoverClose,
  PopoverContent,
  ProvidersTableData,
  StockComponentContainer,
  StockComponentContent,
  StockComponentContentActions,
  StockComponentContentHeader,
  StockComponentHeader
} from "../style"

interface StockComponentProps {
  stock: StockDTO
  onEdit: (stock: StockDTO) => void
  onDelete: (id: number) => void
  onRemoveProductFromStock: (stockId: number, productId: number) => void
}

export function Stock({ stock, onEdit, onDelete, onRemoveProductFromStock }: StockComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openEditStock, setOpenEditStock] = useState(false);
  const [openDeleteStock, setOpenDeleteStock] = useState(false);

  const [isRemovingProductFromStock, setIsRemovingProductFromStock] = useState(false)

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  function handleChangeIsExpanded() {
    setIsExpanded(oldState => !oldState)
  }

  function handleRemoveProductFromStock(productId: number) {
    setSelectedProductId(productId)
    setIsRemovingProductFromStock(true)
  }

  async function removeProductFromStock() {
    try {
      await api.post('/stock_product/remove_product/', { stock_id: stock.id, product_id: selectedProductId })
      onRemoveProductFromStock(stock.id, selectedProductId!)
      toast.success('Produto removido do estoque com sucesso!')
      setIsRemovingProductFromStock(false)
    } catch (err) {
      console.log(err)
      toast.error('Houve um erro ao remover o produto do estoque')
    }
  }

  async function handleDeleteStock() {
    try {
      await api.delete(`/stocks/${stock.id}/`)
      onDelete(stock.id)
      toast.success('Estoque excluído com sucesso!')
      setOpenDeleteStock(false)
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao excluir o estoque')
    }
  }

  return (
    <StockComponentContainer>
      <StockComponentHeader onClick={handleChangeIsExpanded}>
        <div>
          <strong>{stock.name}</strong>
          <p>{stock.stock_products.length} items</p>
        </div>
        {isExpanded ? <CaretUp size={20} /> : <CaretDown size={20} />}
      </StockComponentHeader>
      {isExpanded && (
        <StockComponentContent>
          <StockComponentContentHeader>
            <strong>Produtos</strong>
            <Button text="Adicionar produto" color="green-light" style={{ width: 'auto' }} />
          </StockComponentContentHeader>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Fornecedores</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {stock.stock_products.map(product => (
                <tr key={product.id}>
                  <td>{product.product.name}</td>
                  <ActionsTableData>
                    <div>
                      <Button text="-" style={{ width: 'auto' }} />
                      {product.quantity}
                      <Button text="+" style={{ width: 'auto' }} />
                    </div>
                  </ActionsTableData>
                  <td>{product.product.category}</td>
                  <td>{product.product.description}</td>
                  <ProvidersTableData>
                    {product.product.providers.map(provider => (
                      <Popover.Root key={provider.id}>
                        <Popover.Trigger asChild>
                          <Button text={provider.name} color="yellow" style={{ width: 'auto', color: '#000' }} />
                        </Popover.Trigger>
                        <Popover.Anchor />
                        <Popover.Portal>
                          <PopoverContent>
                            <PopoverClose>
                              <X weight='fill' size='20' />
                            </PopoverClose>
                            <Popover.Arrow />
                            <strong>{provider.name}</strong>
                            <p>{provider.email}</p>
                            <p>{phoneMask(provider.phone)}</p>
                          </PopoverContent>
                        </Popover.Portal>
                      </Popover.Root>
                    ))}
                  </ProvidersTableData>
                  <td>
                    <Button text="Remover do estoque" color="red-light" style={{ width: 'auto' }} onClick={() => handleRemoveProductFromStock(product.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <StockComponentContentActions>
            <Dialog.Root open={openEditStock} onOpenChange={setOpenEditStock}>
              <Dialog.Trigger asChild>
                <Button text="Editar estoque" color="light-blue" style={{ width: 'auto' }} />
              </Dialog.Trigger>
              <EditStockModal onEdit={onEdit} closeModal={() => setOpenEditStock(false)} stock={stock} />
            </Dialog.Root>
            <Dialog.Root open={openDeleteStock} onOpenChange={setOpenDeleteStock}>
              <Dialog.Trigger asChild>
                <Button text="Excluir estoque" color="red-light" style={{ width: 'auto' }} />
              </Dialog.Trigger>
              <ConfirmStockExclusionModal onDelete={handleDeleteStock} />
            </Dialog.Root>
          </StockComponentContentActions>
        </StockComponentContent>
      )}
      {isRemovingProductFromStock && selectedProductId && (
        <Dialog.Root open={isRemovingProductFromStock} onOpenChange={setIsRemovingProductFromStock}>
          <RemoveProductFromStockModal onDelete={removeProductFromStock} />
        </Dialog.Root>
      )}
    </StockComponentContainer>
  )
} 