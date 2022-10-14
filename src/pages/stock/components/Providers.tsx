import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ProviderDTO } from '..';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import { phoneMask } from '../../../utils/masks';

import { ActionsTableData, ContentContainer, CreateButtonContainer, SectionTitle, TableContainer } from "../styles";

export function Providers() {
  const [providers, setProviders] = useState<ProviderDTO[]>([]);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const response = await api.get('/providers/');
        setProviders(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Houve um erro ao carregar sua lista de fornecedores.');
      }
    }

    fetchProviders();
  }, []);

  return (
    <>
      <SectionTitle>Fornecedores</SectionTitle>
      <CreateButtonContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button text='Cadastrar fornecedor' />
          </Dialog.Trigger>
        </Dialog.Root>
      </CreateButtonContainer>
      <ContentContainer>
        <TableContainer>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(provider => (
              <tr key={provider.id}>
                <td>{provider.name}</td>
                <td>{provider.email}</td>
                <td>{phoneMask(provider.phone)}</td>
                <ActionsTableData>
                  <div>
                    <Button text="Editar fornecedor" color="light-blue" style={{ width: 'auto' }} />
                    <Button text="Excluir fornecedor" color="red-light" style={{ width: 'auto' }} />
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
