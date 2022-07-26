import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoCheckmarkSharp, IoPencilSharp, IoTrashSharp, IoCloseSharp } from 'react-icons/io5'
import Modal from "react-modal"
import { useForm } from 'react-hook-form'

import { Button } from '../../components/Button'
import { Base } from '../../components/template'
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
  ActivityStatusColor,
  ActivityTitle,
} from './styles'

interface Activity {
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
  const [selectedActivityId, setSelectedActivityId] = useState(0)
  const [isCreatingActivityModalOpen, setIsCreatingActivityModalOpen] = useState(false)
  const [isEditingActivityModalOpen, setIsEditingActivityModalOpen] = useState(false)
  const [isDeletingActivityModalOpen, setIsDeletingActivityModalOpen] = useState(false)

  const selectedActivity = activities.find(activity => activity.id === selectedActivityId)

  const { register, handleSubmit } = useForm({
    defaultValues: {}
  })

  function handleChangeCreateActivityModal() {
    setIsCreatingActivityModalOpen(oldState => !oldState)
  }

  async function handleCreateActivity(data) {
    console.log("Creating activity")
  }

  function handleChangeFinishActivityModal() {
    setIsCreatingActivityModalOpen(oldState => !oldState)
  }

  async function handleFinishActivity(id: number) {
    try {
      await api.patch(`/activities/${id}/`)
      const newActivities = activities.filter((activity) => {
        if (activity.id === id) {
          activity.finished = true
          activity.finished_at = new Date().toString()
        }
        return activity
      })
      setActivities(newActivities)
    } catch (err) {
      console.log(err)
      toast.error('Houve um erro ao finalizar a atividade')
    }
  }

  function handleChangeEditActivityModal() {
    setIsCreatingActivityModalOpen(oldState => !oldState)
  }

  async function handleEditActivity(id: number) { }

  function handleChangeDeleteActivityModal() {
    setIsDeletingActivityModalOpen(oldState => !oldState)
  }


  async function handleDeleteActivity(id: number) { }

  useEffect(() => {
    async function loadActivities() {
      const response = await api.get('/activities/')
      setActivities(response.data)
    }

    loadActivities()
  }, [])

  return (
    <>
      <Base>
        <ActivitiesContainer>
          <Button text="Cadastrar nova atividade" onClick={handleCreateActivity} />
          {activities.map((activity) => (
            <ActivityContainer key={activity.id}>
              <ActivityStatusColor finished={activity.finished} />
              <ActivityDetails>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityDescription>
                  {activity.description
                    ? activity.description
                    : 'Não há descrição.'}
                </ActivityDescription>
              </ActivityDetails>
              <ActivityInfos>
                <ActivityButtons>
                  {!activity.finished && (
                    <>
                      <ActivityButton
                        color="green-light"
                        onClick={() => handleFinishActivity(activity.id)}
                      >
                        <IoCheckmarkSharp />
                      </ActivityButton>
                      <ActivityButton color="yellow">
                        <IoPencilSharp />
                      </ActivityButton>
                    </>
                  )}
                  <ActivityButton color="red" onClick={handleChangeDeleteActivityModal}>
                    <IoTrashSharp />
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
      </Base>
      <Modal
        isOpen={isCreatingActivityModalOpen}
        onRequestClose={handleChangeCreateActivityModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button type="button" onClick={handleChangeCreateActivityModal} className="react-modal-close">
          <IoCloseSharp size={20} />
        </button>
        <form onSubmit={handleSubmit(handleCreateActivity)}>
          <input type="text" placeholder="titulo" />
          <input type="text" placeholder="descrição" />
          <input type="text" placeholder="planejado para:" />
          <button type="submit">Cadastrar</button>
        </form>
      </Modal>
      {/* <Modal isOpen={isEditingActivityModalOpen}>
      <button type="button" onClick={onRequestClose} className="react-modal-close">
                <IoCloseSharp size={20} />
            </button>
        editando
      </Modal> */}
      <Modal isOpen={isDeletingActivityModalOpen} onRequestClose={handleChangeDeleteActivityModal} overlayClassName="react-modal-overlay"
        className="react-modal-content">
        <button type="button" onClick={handleChangeDeleteActivityModal} className="react-modal-close">
          <IoCloseSharp size={20} />
        </button>
        Tem certeza que deseja excluir a atividade?
        <div>
          <button type="button">Cancelar</button>
          <button type="submit">Excluir</button>
        </div>
      </Modal>
    </>
  )
}

export default Activities
