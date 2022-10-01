import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useKeenSlider } from 'keen-slider/react'

import { cepMask, cnpjMask, phoneMask } from '../../utils/masks'
import { Base } from '../../components/template'
import { api } from '../../services/api'

import {
  MainContainer,
  WelcomeMessage,
  SectionTitle,
  TrainingContainer,
  TrainingsContainer,
  TrainingTitle,
  TrainingDescription,
  UserContainer,
  UsersContainer,
} from './styles'

import '@vime/core/themes/default.css'
import 'keen-slider/keen-slider.min.css'

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

interface User {
  id: number
  corporate_name: string
  description: string
  cnpj: string
  city: string
  cep: string
  uf: string
  email: string
  phone: string
}


const Dashboard: NextPage = () => {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingTrainings, setIsLoadingTrainings] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
    loop: true,
  },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const response = await api.get('/trainings/')
        setTrainings(response.data)
        setIsLoadingTrainings(false)
      } catch (err) {
        console.log(err)
        toast.error('Houve um erro ao carregar os treinamentos')
      }
    }

    async function fetchUsers() {
      try {
        const response = await api.get('/companies/all/')
        setUsers(response.data)
        setIsLoadingUsers(false)
      } catch (err) {
        toast.error('Houve um erro ao encontrar outros MEIs')
        console.log(err)
      }
    }

    fetchTrainings()
    fetchUsers()
  }, [])

  return (
    <Base>
      <MainContainer>
        <WelcomeMessage>Bem vindo ao MEIHelp</WelcomeMessage>
        <SectionTitle>Treinamentos</SectionTitle>
        {!isLoadingTrainings && (
          <TrainingsContainer ref={sliderRef} className="keen-slider">
            {trainings.map((training) => (
              <TrainingContainer key={training.id} className="keen-slider__slide">
                <Player>
                  <Youtube videoId={training.url.split('/')[3]} />
                  <DefaultUi />
                </Player>
                <TrainingTitle>{training.title}</TrainingTitle>
                <TrainingDescription>{training.description}</TrainingDescription>
              </TrainingContainer>
            ))}
          </TrainingsContainer>
        )}
        <SectionTitle>Encontre outros MEIs</SectionTitle>
        <UsersContainer>
          {users.map((user) => (
            <UserContainer key={user.id}>
              <div>
                <strong>{user.corporate_name}</strong>
                <p>CNPJ: {cnpjMask(user.cnpj)}</p>
                <span>{user.description}</span>
              </div>
              <div>
                <strong>
                  {user.city} - {user.uf}
                </strong>
                <p>{cepMask(user.cep)}</p>
                <strong>{user.email}</strong>
                <strong>{phoneMask(user.phone)}</strong>
              </div>
            </UserContainer>
          ))}
        </UsersContainer>
      </MainContainer>
    </Base>
  )
}

export default Dashboard
