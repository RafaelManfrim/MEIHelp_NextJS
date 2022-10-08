import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as zod from 'zod'
import { Activity } from '../../pages/activities';
import { api } from '../../services/api';
import { dateMask } from '../../utils/masks';

import { Button } from '../Button';

import { CloseButton, Collums, Content, FormGroup, Overlay } from './styles';

const schema = zod.object({
  title: zod.string().min(3, { message: "O título deve ter no mínimo 3 caracteres." }).max(32, { message: 'O título deve ter no máximo 32 caracteres.' }),
  description: zod.string().optional(),
  forecast_date: zod.string().min(10, { message: "A data deve ser válida" }).refine((value) => {
    const [day, month, year] = value.split('/')
    return Number(month) <= 12
  }, { message: 'O mês digitado deve ser válido' })
})

type EditActivityFormSchema = zod.infer<typeof schema>

interface EditActivityModalProps {
  closeModal: () => void
  onEdit: (activity: Activity) => void
  activity: Activity
}

export function EditActivityModal({ closeModal, onEdit, activity }: EditActivityModalProps) {
  const { register, handleSubmit, reset, formState, watch } = useForm<EditActivityFormSchema>({
    defaultValues: {
      title: activity.title,
      description: activity.description,
      forecast_date: new Date(activity.forecast_date).toLocaleDateString()
    },
    resolver: zodResolver(schema)
  })

  const forecastDate = watch('forecast_date')

  async function handleEditActivity(data: EditActivityFormSchema) {
    const forecastDateFormatted = data.forecast_date.split('/').reverse().join('-')

    const activityData = {
      title: data.title,
      description: data.description,
      forecast_date: forecastDateFormatted,
    }

    try {
      const response = await api.put(`/activities/${activity.id}/`, { ...activityData })
      onEdit(response.data)
      toast.success('Compromisso editado com sucesso!')
      reset()
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao editar o compromisso')
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Editar compomisso</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditActivity)}>
          <Collums>
            <FormGroup>
              <label htmlFor="title">Nome:</label>
              <input
                placeholder='Dê um nome para seu compromisso'
                id="title"
                {...register("title")}
              />
              {formState.errors.title && <span>{formState.errors.title.message}</span>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="forecast_date">Previsão:</label>
              <input
                placeholder='Previsto para a data'
                id="forecast_date"
                {...register("forecast_date")}
                value={dateMask(forecastDate)}
              />
              {formState.errors.forecast_date && <span>{formState.errors.forecast_date.message}</span>}
            </FormGroup>
          </Collums>
          <FormGroup>
            <label htmlFor="description">Descrição:</label>
            <textarea
              placeholder='Digite a descrição do seu compromisso (opicional)'
              id="description"
              {...register("description")}
            />
            {formState.errors.description && <span>{formState.errors.description.message}</span>}
          </FormGroup>

          <Collums style={{ marginTop: 16 }}>
            <Dialog.Close asChild>
              <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
            </Dialog.Close>
            <Button text="Editar" type="submit" color="blue" />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}