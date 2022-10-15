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

export function Products() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

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
                          <Button text="Remover fornecedor" color="red-light" />
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
    </>
  )
}
