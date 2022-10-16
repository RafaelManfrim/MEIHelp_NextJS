import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ProviderDTO } from '../../../../pages/stock';
import { api } from '../../../../services/api';
import { Button } from '../../../Button';
import { CloseButton, Collums, Content, FormGroup, Overlay } from '../styles';

interface AddProviderToProductProps {
  onAdd: (id: number) => void
  productProvidersIds: number[]
}

export function AddProviderToProductModal({ productProvidersIds, onAdd }: AddProviderToProductProps) {
  const [providers, setProviders] = useState<ProviderDTO[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProviders() {
      setIsLoading(true)
      try {
        const response = await api.get('/providers/')
        setProviders(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        toast.error('Erro ao carregar fornecedores.')
      }
    }

    fetchProviders()
  }, [])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Adicionar fornecedor</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>
        <FormGroup>
          <label htmlFor="provider">Fornecedor</label>
          <select name="provider" id="provider" value={String(selectedProviderId)} onChange={(e) => setSelectedProviderId(Number(e.target.value))}>
            <option value='null'>Selecione um fornecedor</option>
            {providers.map(provider => !productProvidersIds.includes(provider.id) && (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </select>
        </FormGroup>
        <Collums style={{ marginTop: 16 }}>
          <Dialog.Close asChild>
            <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
          </Dialog.Close>
          <Button
            text="Adicionar"
            type="button"
            color="green-light"
            disabled={!selectedProviderId}
            onClick={() => onAdd(selectedProviderId!)}
          />
        </Collums>
      </Content>
    </Dialog.Portal>
  )
}