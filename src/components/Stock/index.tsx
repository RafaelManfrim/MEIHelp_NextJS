import * as Popover from '@radix-ui/react-popover';
import { CaretDown, CaretUp, X } from "phosphor-react"
import { useState } from "react"

import { StockDTO } from "../../pages/stock"
import { phoneMask } from '../../utils/masks';
import { Button } from "../Button"

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
} from "./style"

interface StockComponentProps {
  stock: StockDTO
}

export function Stock({ stock }: StockComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  function handleChangeIsExpanded() {
    setIsExpanded(oldState => !oldState)
  }

  async function handleRemoveProviderFromProduct(providerId: string, productId: string) {
    console.log("Produto:", productId, "Fornecedor:", providerId)
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
            {/* Implementar modal de adicionar de produto */}
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
                  <td>{product.quantity}</td>
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
                            <Button text="Remover fornecedor" color="red-light" />
                          </PopoverContent>
                        </Popover.Portal>
                      </Popover.Root>

                    ))}
                  </ProvidersTableData>
                  <ActionsTableData>
                    <div>
                      <Button text="Editar produto" color="light-blue" style={{ width: 'auto' }} />
                      <Button text="Excluir produto" color="red-light" style={{ width: 'auto' }} />
                    </div>
                  </ActionsTableData>
                </tr>
              ))}
            </tbody>
          </table>
          <StockComponentContentActions>
            <Button text="Editar estoque" color="light-blue" style={{ width: 'auto' }} />
            <Button text="Excluir estoque" color="red-light" style={{ width: 'auto' }} />
          </StockComponentContentActions>
        </StockComponentContent>
      )}
    </StockComponentContainer>
  )
} 