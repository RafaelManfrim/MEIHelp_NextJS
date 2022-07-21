import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Base } from '../../components/template'
import { api } from '../../services/api'

import {
  MainContainer,
  TrainingContainer,
  TrainingDescription,
  TrainingsContainer,
  TrainingsTitle,
  TrainingTitle,
} from './styles'

import '@vime/core/themes/default.css'

const Player = dynamic(
  () => import('@vime/react').then((module) => module.Player),
  { ssr: false },
)
const Youtube = dynamic(
  () => import('@vime/react').then((module) => module.Youtube),
  { ssr: false },
)
const DefaultUi = dynamic(
  () => import('@vime/react').then((module) => module.DefaultUi),
  { ssr: false },
)

interface Training {
  id: number
  url: string
  title: string
  description: string
}

const Trainings: NextPage = () => {
  const [trainings, setTrainings] = useState<Training[]>([])

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const response = await api.get('/trainings/')
        setTrainings(response.data)
      } catch (err) {
        console.log(err)
        toast.error('Houve um erro ao carregar os treinamentos')
      }
    }

    fetchTrainings()
  }, [])

  return (
    <Base>
      <MainContainer>
        <TrainingsTitle>Treinamentos</TrainingsTitle>
        <TrainingsContainer>
          {trainings.map((training) => (
            <TrainingContainer key={training.id}>
              <Player>
                <Youtube videoId={training.url.split('/')[3]} />
                <DefaultUi />
              </Player>
              <TrainingTitle>{training.title}</TrainingTitle>
              <TrainingDescription>{training.description}</TrainingDescription>
            </TrainingContainer>
          ))}
        </TrainingsContainer>
      </MainContainer>
    </Base>
  )
}

export default Trainings
