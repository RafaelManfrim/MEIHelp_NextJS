import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ProductDTO } from '../../pages/stock';
import { Button } from '../Button';
import { api } from '../../services/api';
import { phoneMask } from '../../utils/masks';

import { ActionsTableData, ContentContainer, CreateButtonContainer, PopoverClose, PopoverContent, ProvidersTableData, SectionTitle, TableContainer } from "../../pages/stock/styles";
import { RemoveProviderFromProductModal } from './Modals/Product/RemoveProviderFromProductModal';

export function Products() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [isRemovingProvider, setIsRemovingProvider] = useState(false)

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const selectedProduct = products.find(product => product.id === selectedProductId)

  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)

  function handleRemoveProviderFromProduct(productId: number, providerId: number) {
    setSelectedProductId(productId)
    setSelectedProviderId(providerId)
    setIsRemovingProvider(true)
  }

  async function removeProviderFromProduct() {
    try {
      await api.post(`/products/${selectedProductId}/remove_provider/`, { provider_id: selectedProviderId })
      const updatedProducts = products.map(product => {
        if (product.id === selectedProductId) {
          product.providers = product.providers.filter(provider => provider.id !== selectedProviderId)
        }
        return product
      })
      setProducts(updatedProducts)
      toast.success('Fornecedor removido com sucesso!')
      setIsRemovingProvider(false)
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao remover o fornecedor do produto')
    }
  }



  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Houve um erro ao carregar sua lista de produtos.');
      }
    }

    fetchProducts();
  }, [])

  return (
    <>
      <SectionTitle>Produtos</SectionTitle>
      <CreateButtonContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button text='Cadastrar produto' />
          </Dialog.Trigger>
        </Dialog.Root>
      </CreateButtonContainer>
      <ContentContainer>
        <TableContainer>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Fornecedores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <ProvidersTableData>
                  {product.providers.map(provider => (
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
                          <Button
                            text="Remover fornecedor"
                            color="red-light"
                            onClick={() => handleRemoveProviderFromProduct(product.id, provider.id)}
                          />
                        </PopoverContent>
                      </Popover.Portal>
                    </Popover.Root>
                  ))}
                  <Button text="+" style={{ width: 'auto' }} />
                </ProvidersTableData>
                <ActionsTableData>
                  <div>
                    <Button text="Editar produto" style={{ width: 'auto' }} />
                    <Button text="Excluir produto" color="red-light" style={{ width: 'auto' }} />
                  </div>
                </ActionsTableData>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </ContentContainer>
      {isRemovingProvider && (
        <Dialog.Root open={isRemovingProvider} onOpenChange={setIsRemovingProvider}>
          <RemoveProviderFromProductModal onDelete={removeProviderFromProduct} />
        </Dialog.Root>
      )}
    </>
  )
}
