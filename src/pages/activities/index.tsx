import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { IoCheckmarkSharp, IoPencilSharp, IoTrashSharp } from 'react-icons/io5'
import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { api } from '../../services/api'

import { ActivitiesContainer, ActivityButton, ActivityButtons, ActivityContainer, ActivityCreatedAt, ActivityDescription, ActivityDetails, ActivityInfos, ActivityStatus, ActivityStatusColor, ActivityTitle } from './styles'

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
                <Button text='Cadastrar nova atividade' />
                {activities.map(activity => {
                    return (
                        <ActivityContainer key={activity.id}>
                            <ActivityStatusColor finished={activity.finished}/>
                            <ActivityDetails>
                                <ActivityTitle>{activity.title}</ActivityTitle>
                                <ActivityDescription>{activity.description ? activity.description : 'Não há descrição.'}</ActivityDescription>
                            </ActivityDetails>
                            <ActivityInfos>
                                <ActivityCreatedAt>Criado em: {activity.created_at}</ActivityCreatedAt>
                                <ActivityStatus>{activity.finished ? `Finalizado: ${activity.finished_at}` : `Previsão de conclusão: ${activity.forecast_date}`}</ActivityStatus>
                                <ActivityButtons>
                                    {!activity.finished && (
                                        <>
                                            <ActivityButton color='green-light'><IoCheckmarkSharp /></ActivityButton>
                                            <ActivityButton color='yellow'><IoPencilSharp /></ActivityButton>
                                        </>
                                    )}
                                    <ActivityButton color='red'><IoTrashSharp /></ActivityButton>
                                </ActivityButtons>
                            </ActivityInfos>
                        </ActivityContainer>
                    )
                })}
            </ActivitiesContainer>
        </Base>
    )
}

export default Activities
