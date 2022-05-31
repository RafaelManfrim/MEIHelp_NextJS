import type { NextPage } from 'next'
import { IoCheckmarkSharp, IoPencilSharp, IoTrashSharp } from 'react-icons/io5'
import { Button } from '../../components/Button'
import { Base } from '../../components/template'

import { ActivitiesContainer, ActivityButton, ActivityButtons, ActivityContainer, ActivityCreatedAt, ActivityDescription, ActivityDetails, ActivityInfos, ActivityStatus, ActivityStatusColor, ActivityTitle } from './styles'

const Activities: NextPage = () => {
    const activities = [
        {
            id: 1,
            title: 'Teste',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            finished: false,
            forecast_date: new Date(),
            created_at: new Date(),
            finished_at: new Date(),
        },
        {
            id: 2,
            title: 'Teste 2',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            finished: false,
            forecast_date: new Date(),
            created_at: new Date(),
            finished_at: new Date(),
        },
        {
            id: 3,
            title: 'Teste 3',
            description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            finished: true,
            forecast_date: new Date(),
            created_at: new Date(),
            finished_at: new Date(),
        },
        {
            id: 4,
            title: 'Teste 4',
            description: "",
            finished: true,
            forecast_date: new Date(),
            created_at: new Date(),
            finished_at: new Date(),
        },
    ]

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
                                <ActivityCreatedAt>Criado em: {activity.created_at.toLocaleDateString()}</ActivityCreatedAt>
                                <ActivityStatus>{activity.finished ? `Finalizado: ${activity.finished_at.toLocaleDateString()}` : `Previsão de conclusão: ${activity.forecast_date.toLocaleDateString()}`}</ActivityStatus>
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
