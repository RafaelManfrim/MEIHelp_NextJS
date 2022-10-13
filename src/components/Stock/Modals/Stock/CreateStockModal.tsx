import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../../Button';
import { api } from '../../../../services/api';
import { StockDTO } from '../../../../pages/stock';

import { CloseButton, Collums, Content, FormGroup, Overlay } from './styles';

const schema = zod.object({
  name: zod.string().max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
})

type NewStockFormSchema = zod.infer<typeof schema>

interface CreateActivityModalProps {
  closeModal: () => void;
  onCreate: (stock: StockDTO) => void
}

export function CreateStockModal({ closeModal, onCreate }: CreateActivityModalProps) {
  const { register, handleSubmit, formState, reset } = useForm<NewStockFormSchema>({
    resolver: zodResolver(schema)
  })

  async function handleCreateStock(data: NewStockFormSchema) {
    try {
      const response = await api.post('/stocks/', { name: data.name })
      onCreate(response.data)
      toast.success('Estoque criado com sucesso!')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao criar o estoque')
    }

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e: KeyboardEvent) => e.preventDefault()}>
        <Dialog.Title>Criar estoque</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateStock)}>
          <FormGroup>
            <label htmlFor="name">Nome:</label>
            <input
              placeholder='Dê um nome para seu novo estoque'
              id="name"
              {...register("name")}
            />
            {formState.errors.name && <span>{formState.errors.name.message}</span>}
          </FormGroup>
          <Collums style={{ marginTop: 16 }}>
            <Dialog.Close asChild>
              <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
            </Dialog.Close>
            <Button text="Criar" type="submit" color="green-light" />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}