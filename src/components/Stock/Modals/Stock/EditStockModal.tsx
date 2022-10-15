import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../../Button';
import { api } from '../../../../services/api';
import { StockDTO } from '../../../../pages/stock';

import { CloseButton, Collums, Content, FormGroup, Overlay } from '../styles';

const schema = zod.object({
  name: zod.string().max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
})

type EditStockFormSchema = zod.infer<typeof schema>

interface EditStockModalProps {
  closeModal: () => void;
  onEdit: (stock: StockDTO) => void
  stock: StockDTO
}

export function EditStockModal({ closeModal, onEdit, stock }: EditStockModalProps) {
  const { register, handleSubmit, formState, reset } = useForm<EditStockFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: stock.name,
    }
  })

  async function handleEditStock(data: EditStockFormSchema) {
    try {
      const response = await api.patch(`/stocks/${stock.id}/`, { name: data.name })
      onEdit(response.data)
      toast.success('Estoque editado com sucesso!')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao editar o estoque')
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

        <form onSubmit={handleSubmit(handleEditStock)}>
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
            <Button text="Editar" type="submit" color="green-light" />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}