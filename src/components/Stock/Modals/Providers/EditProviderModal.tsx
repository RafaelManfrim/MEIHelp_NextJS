import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../../Button';
import { api } from '../../../../services/api';
import { ProviderDTO } from '../../../../pages/stock';
import { phoneMask } from '../../../../utils/masks';
import { normalizePhone } from '../../../../utils/normalizers';

import { CloseButton, Collums, Content, FormGroup, Overlay } from '../styles';

const schema = zod.object({
  name: zod.string().max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
  email: zod.string().email({ message: 'O e-mail deve ser válido.' }),
  phone: zod.string().max(15, { message: 'O telefone deve ter no máximo 15 caracteres.' }),
})

type EditProviderFormSchema = zod.infer<typeof schema>

interface EditProviderModalProps {
  closeModal: () => void;
  onEdit: (provider: ProviderDTO) => void
  provider: ProviderDTO
}

export function EditProviderModal({ closeModal, onEdit, provider }: EditProviderModalProps) {
  const { register, handleSubmit, formState, reset, watch } = useForm<EditProviderFormSchema>({
    defaultValues: {
      name: provider.name,
      email: provider.email,
      phone: provider.phone
    },
    resolver: zodResolver(schema)
  })

  const phone = watch('phone') || ''

  async function handleEditProvider(data: EditProviderFormSchema) {
    const editedProvider = {
      name: data.name,
      email: data.email,
      phone: normalizePhone(data.phone)
    }

    try {
      const response = await api.patch(`/providers/${provider.id}/`, { ...editedProvider })
      onEdit(response.data)
      toast.success('Fornecedor atualizado com sucesso!')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao atualizar o fonecedor')
    }

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Editar estoque</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditProvider)}>
          <FormGroup>
            <label htmlFor="name">Nome:</label>
            <input
              placeholder='Insira o nome do fornecedor'
              id="name"
              {...register("name")}
            />
            {formState.errors.name && <span>{formState.errors.name.message}</span>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">E-mail:</label>
            <input
              placeholder='Insinar um e-mail de seu fornecedor'
              id="email"
              {...register("email")}
            />
            {formState.errors.email && <span>{formState.errors.email.message}</span>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Telefone</label>
            <input
              placeholder='Digite o telefone do fornecedor'
              id="phone"
              {...register("phone")}
              value={phoneMask(phone)}
            />
            {formState.errors.phone && <span>{formState.errors.phone.message}</span>}
          </FormGroup>
          <Collums style={{ marginTop: 16 }}>
            <Dialog.Close asChild>
              <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
            </Dialog.Close>
            <Button text="Editar" type="submit" color="light-blue" />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}