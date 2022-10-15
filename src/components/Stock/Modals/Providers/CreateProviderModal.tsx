import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../../Button';
import { api } from '../../../../services/api';
import { ProviderDTO } from '../../../../pages/stock';

import { CloseButton, Collums, Content, FormGroup, Overlay } from '../styles';
import { phoneMask } from '../../../../utils/masks';
import { normalizePhone } from '../../../../utils/normalizers';

const schema = zod.object({
  name: zod.string().max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
  email: zod.string().email({ message: 'O e-mail deve ser válido.' }),
  phone: zod.string().max(15, { message: 'O telefone deve ter no máximo 15 caracteres.' }),
})

type NewProviderFormSchema = zod.infer<typeof schema>

interface CreateProviderModalProps {
  closeModal: () => void;
  onCreate: (provider: ProviderDTO) => void
}

export function CreateProviderModal({ closeModal, onCreate }: CreateProviderModalProps) {
  const { register, handleSubmit, formState, reset, watch } = useForm<NewProviderFormSchema>({
    resolver: zodResolver(schema)
  })

  const phone = watch('phone') || ''

  async function handleCreateProvider(data: NewProviderFormSchema) {
    const provider = {
      name: data.name,
      email: data.email,
      phone: normalizePhone(data.phone)
    }

    try {
      const response = await api.post('/providers/', { ...provider })
      onCreate(response.data)
      toast.success('Fornecedor cadastrado com sucesso!')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao cadastrar o fonecedor')
    }

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Criar estoque</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateProvider)}>
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
            <Button text="Cadastrar" type="submit" color="green-light" />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}