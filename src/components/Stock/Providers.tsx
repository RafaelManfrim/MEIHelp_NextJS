import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ProviderDTO } from '../../pages/stock';
import { Button } from '../Button';
import { api } from '../../services/api';
import { phoneMask } from '../../utils/masks';

import { ActionsTableData, ContentContainer, CreateButtonContainer, SectionTitle, TableContainer } from "../../styles/pages/stock";
import { CreateProviderModal } from './Modals/Providers/CreateProviderModal';
import { ConfirmProviderExclusionModal } from './Modals/Providers/ConfirmProviderExclusion';
import { EditProviderModal } from './Modals/Providers/EditProviderModal';

export function Providers() {
  const [providers, setProviders] = useState<ProviderDTO[]>([]);
  const [isCreatingProvider, setIsCreatingProvider] = useState(false)
  const [isEditingProvider, setIsEditingProvider] = useState(false)
  const [isDeletingProvider, setIsDeletingProvider] = useState(false)

  const [selectedProviderId, setSelectedProviderId] = useState(0)
  const selectedProvider = providers.find(provider => provider.id === selectedProviderId)

  function addProviderToList(provider: ProviderDTO) {
    setProviders([...providers, provider])
  }

  function handleEditProvider(id: number) {
    setSelectedProviderId(id)
    setIsEditingProvider(true)
  }

  function editProviderInList(provider: ProviderDTO) {
    const updatedProviders = providers.map(p => p.id === provider.id ? provider : p)
    setProviders(updatedProviders)
  }

  function handleDeleteProvider(id: number) {
    setSelectedProviderId(id)
    setIsDeletingProvider(true)
  }

  async function deleteProvider() {
    try {
      await api.delete(`/providers/${selectedProviderId}/`)
      setProviders(oldProviders => oldProviders.filter(provider => provider.id !== selectedProviderId))
      toast.success('Fornecedor excluído com sucesso!')
      setIsDeletingProvider(false)
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao excluir o fornecedor')
    }
  }

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
        <Dialog.Root open={isCreatingProvider} onOpenChange={setIsCreatingProvider}>
          <Dialog.Trigger asChild>
            <Button text='Cadastrar fornecedor' />
          </Dialog.Trigger>
          <CreateProviderModal closeModal={() => setIsCreatingProvider(false)} onCreate={addProviderToList} />
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
                    <Button text="Editar fornecedor" color="light-blue" onClick={() => handleEditProvider(provider.id)} style={{ width: 'auto' }} />
                    <Button text="Excluir fornecedor" color="red-light" onClick={() => handleDeleteProvider(provider.id)} style={{ width: 'auto' }} />
                  </div>
                </ActionsTableData>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </ContentContainer>
      {isEditingProvider && selectedProvider && (
        <Dialog.Root open={isEditingProvider} onOpenChange={setIsEditingProvider}>
          <EditProviderModal provider={selectedProvider} closeModal={() => setIsEditingProvider(false)} onEdit={editProviderInList} />
        </Dialog.Root>
      )}
      {isDeletingProvider && selectedProvider && (
        <Dialog.Root open={isDeletingProvider} onOpenChange={setIsDeletingProvider}>
          <ConfirmProviderExclusionModal onDelete={deleteProvider} />
        </Dialog.Root>
      )}
    </>
  )
}
