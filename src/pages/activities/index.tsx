import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoCheckmarkSharp, IoPencilSharp, IoTrashSharp } from 'react-icons/io5'
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

  async function handleCreateActivity() { }

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

  async function handleEditActivity(id: number) { }

  async function handleDeleteActivity(id: number) { }

  useEffect(() => {
    async function loadActivities() {
      const response = await api.get('/activities/')
      setActivities(response.data)
    }

    loadActivities()
  }, [])

  return (
    <Base>
      <ActivitiesContainer>
        <Button text="Cadastrar nova atividade" />
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
                <ActivityButton color="red">
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
  )
}

export default Activities
