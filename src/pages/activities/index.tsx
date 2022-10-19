import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle, Pencil, Trash } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { CreateActivityModal } from '../../components/Modal/CreateActivityModal'
import { EditActivityModal } from '../../components/Modal/EditActivityModal';
import { ConfirmActivityExclusion } from '../../components/Modal/ConfirmActivityExclusion';
import { api } from '../../services/api'

import {
  ActivitiesContainer,
  ActivityButton,
  ActivityButtons,
  ActivityContainer,
  ActivityCreatedAt,
  ActivityDescription,
  ActivityDetails,
  ActivityInfos,
  ActivityStatus,
  ActivityTitle,
  MainContainer,
  SectionTitle,
} from '../../styles/pages/activities'

export interface Activity {
  id: number
  title: string
  description: string
  finished: boolean
  forecast_date: string
  created_at: string
  updated_at: string
  finished_at: string
}

const Activities: NextPage = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [selectedActivityId, setSelectedActivityId] = useState(0)
  const selectedActivity = activities.find(activity => activity.id === selectedActivityId)

  function addCreatedActivityToList(activity: Activity) {
    setActivities(oldActivities => [...oldActivities, activity])
  }

  async function completeActivity(id: number) {
    try {
      await api.patch(`/activities/${id}/`)
      setActivities(oldActivities => oldActivities.map(activity => {
        if (activity.id === id) {
          activity.finished = true
          activity.finished_at = new Date().toISOString()
        }

        return activity
      }))
      toast.success('Atividade concluída com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao completar atividade')
    }
  }

  function handleEditActivity(id: number) {
    setSelectedActivityId(id)
    setOpenEditModal(true)
  }

  function editActivity(activity: Activity) {
    setActivities(oldActivities => oldActivities.map(oldActivity => {
      if (oldActivity.id === activity.id) {
        return activity
      }

      return oldActivity
    }))
  }

  function handleDeleteActivity(id: number) {
    setSelectedActivityId(id)
    setOpenDeleteConfirmation(true)
  }

  async function deleteActivity(id: number) {
    try {
      await api.delete(`/activities/${id}/`)
      setActivities(oldActivities => oldActivities.filter(activity => activity.id !== id))
      toast.success('Compromisso excluído com sucesso!')
      setOpenDeleteConfirmation(false)
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao excluir o compromisso')
    }
  }

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await api.get('/activities/')
        setActivities(response.data)
      } catch (err) {
        console.log(err)
        toast.error('Houve um erro ao carregar as atividades')
      }
    }

    loadActivities()
  }, [])

  return (
    <Base>
      <MainContainer>
        <SectionTitle>Compromissos</SectionTitle>
        <ActivitiesContainer>
          <Dialog.Root open={openCreateModal} onOpenChange={setOpenCreateModal}>
            <Dialog.Trigger asChild>
              <Button text="Cadastrar novo compromisso" />
            </Dialog.Trigger>
            <CreateActivityModal closeModal={() => setOpenCreateModal(false)} onCreate={addCreatedActivityToList} />
          </Dialog.Root>
          {activities.map((activity) => (
            <ActivityContainer key={activity.id} finished={activity.finished}>
              <ActivityDetails>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityDescription>
                  {activity.description ? activity.description : 'Não há descrição.'}
                </ActivityDescription>
              </ActivityDetails>
              <ActivityInfos>
                <ActivityButtons>
                  {!activity.finished && (
                    <>
                      <ActivityButton color="green-light" onClick={() => completeActivity(activity.id)}>
                        <CheckCircle weight='fill' size={20} />
                      </ActivityButton>
                      <ActivityButton color="blue" onClick={() => handleEditActivity(activity.id)}>
                        <Pencil weight='fill' size={20} />
                      </ActivityButton>
                    </>
                  )}
                  <ActivityButton color="red" onClick={() => handleDeleteActivity(activity.id)}>
                    <Trash weight='fill' size={20} />
                  </ActivityButton>
                </ActivityButtons>
                <ActivityCreatedAt>
                  Criado em: {new Date(activity.created_at).toLocaleDateString()}
                </ActivityCreatedAt>
                <ActivityStatus>
                  {activity.finished
                    ? `Concluído em: ${new Date(
                      activity.finished_at,
                    ).toLocaleDateString()}`
                    : `Previsto para: ${new Date(
                      activity.forecast_date,
                    ).toLocaleDateString()}`}
                </ActivityStatus>
              </ActivityInfos>
            </ActivityContainer>
          ))}
        </ActivitiesContainer>
      </MainContainer>
      {openEditModal && selectedActivity && (
        <Dialog.Root open={openEditModal} onOpenChange={setOpenEditModal}>
          <EditActivityModal
            closeModal={() => setOpenEditModal(false)}
            onEdit={editActivity}
            activity={selectedActivity!}
          />
        </Dialog.Root>
      )}
      {openDeleteConfirmation && selectedActivity && (
        <Dialog.Root open={openDeleteConfirmation} onOpenChange={setOpenDeleteConfirmation}>
          <ConfirmActivityExclusion activityId={selectedActivity.id} onDelete={deleteActivity} />
        </Dialog.Root>
      )}
    </Base >
  )
}

export default Activities
