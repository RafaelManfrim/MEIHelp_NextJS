import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import toast from 'react-hot-toast';
import { X } from 'phosphor-react';

import { ProductDTO } from '../../pages/stock';
import { Button } from '../Button';
import { api } from '../../services/api';
import { phoneMask } from '../../utils/masks';

import { RemoveProviderFromProductModal } from './Modals/Product/RemoveProviderFromProductModal';
import { DeleteProductModal } from './Modals/Product/DeleteProductModal';
import { AddProviderToProductModal } from './Modals/Product/AddProviderToProductModal';
import { CreateProductModal } from './Modals/Product/CreateProductModal';
import { EditProductModal } from './Modals/Product/EditProductModal';

import { ActionsTableData, ContentContainer, CreateButtonContainer, PopoverClose, PopoverContent, ProvidersTableData, SectionTitle, TableContainer } from "../../styles/pages/stock";

export function Products() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [isRemovingProvider, setIsRemovingProvider] = useState(false)
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const [isAddingProviderToProduct, setIsAddingProviderToProduct] = useState(false)

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const selectedProduct = products.find(product => product.id === selectedProductId)

  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)

  function addProductToList(product: ProductDTO) {
    setProducts(oldProducts => [...oldProducts, product])
  }

  function handleEditProduct(id: number) {
    setSelectedProductId(id)
    setIsEditingProduct(true)
  }

  function editProductInList(product: ProductDTO) {
    setProducts(oldProducts => oldProducts.map(oldProduct => oldProduct.id === product.id ? product : oldProduct))
  }

  function handleAddProviderToProduct(productId: number) {
    setSelectedProductId(productId)
    setIsAddingProviderToProduct(true)
  }

  async function addProviderToProduct(providerId: number) {
    try {
      const response = await api.post(`products/${selectedProductId}/add_provider/`, { provider_id: providerId })
      setProducts(oldProducts => oldProducts.map(product => product.id === selectedProductId ? response.data : product))
      toast.success('Fornecedor adicionado com sucesso!')
      setIsAddingProviderToProduct(false)
    } catch (error) {
      toast.error('Erro ao adicionar fornecedor.')
      console.log(error)
    }
  }

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

  function handleDeleteProduct(id: number) {
    setSelectedProductId(id)
    setIsDeletingProduct(true)
  }

  async function deleteProduct() {
    try {
      await api.delete(`/products/${selectedProductId}/`)
      setProducts(oldProducts => oldProducts.filter(product => product.id !== selectedProductId))
      toast.success('Produto removido com sucesso!')
      setIsDeletingProduct(false)
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao remover o produto.')
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
        <Dialog.Root open={isCreatingProduct} onOpenChange={setIsCreatingProduct}>
          <Dialog.Trigger asChild>
            <Button text='Cadastrar produto' />
          </Dialog.Trigger>
          <CreateProductModal closeModal={() => setIsCreatingProduct(false)} onCreate={addProductToList} />
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
                  <Button text="+" style={{ width: 'auto' }} onClick={() => handleAddProviderToProduct(product.id)} />
                </ProvidersTableData>
                <ActionsTableData>
                  <div>
                    <Button text="Editar" onClick={() => handleEditProduct(product.id)} style={{ width: 'auto' }} />
                    <Button text="Excluir" color="red-light" onClick={() => handleDeleteProduct(product.id)} style={{ width: 'auto' }} />
                  </div>
                </ActionsTableData>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </ContentContainer>
      {isEditingProduct && selectedProductId && (
        <Dialog.Root open={isEditingProduct} onOpenChange={setIsEditingProduct}>
          <EditProductModal onEdit={editProductInList} product={selectedProduct!} closeModal={() => setIsEditingProduct(false)} />
        </Dialog.Root>
      )}
      {isAddingProviderToProduct && selectedProductId && (
        <Dialog.Root open={isAddingProviderToProduct} onOpenChange={setIsAddingProviderToProduct}>
          <AddProviderToProductModal onAdd={addProviderToProduct} productProvidersIds={selectedProduct?.providers.map(provider => provider.id) || []} />
        </Dialog.Root>
      )}
      {isRemovingProvider && selectedProductId && selectedProviderId && (
        <Dialog.Root open={isRemovingProvider} onOpenChange={setIsRemovingProvider}>
          <RemoveProviderFromProductModal onDelete={removeProviderFromProduct} />
        </Dialog.Root>
      )}
      {isDeletingProduct && selectedProduct && (
        <Dialog.Root open={isDeletingProduct} onOpenChange={setIsDeletingProduct}>
          <DeleteProductModal onDelete={deleteProduct} />
        </Dialog.Root>
      )}
    </>
  )
}
