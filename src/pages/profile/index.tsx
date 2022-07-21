import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { useAuth } from '../../contexts/AuthContext'
import { cepMask, phoneMask } from '../../utils/masks'
import { normalizeCep, normalizePhone } from '../../utils/normalizers'

import {
  CepInput,
  DescriptionContainer,
  EmailInput,
  InputControl,
  InputLabel,
  MainContainer,
  NameContainer,
  PhoneInput,
  ProfileContainer,
  ProfileTitle,
  Row,
} from './styles'

const Profile: NextPage = () => {
  const { user } = useAuth()
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [cep, setCep] = useState(user.cep || '')
  const [description, setDescription] = useState(user.description || '')

  async function handleSaveChanges() {
    console.log(email, normalizePhone(phone), normalizeCep(cep), description)
  }

  async function handleDeleteAccount() {
    console.log('delete account')
  }

  useEffect(() => {
    setEmail(user.email || '')
    setPhone(user.phone || '')
    setCep(user.cep || '')
    setDescription(user.description || '')
  }, [user])

  return (
    <Base>
      <MainContainer>
        <ProfileTitle>Perfil</ProfileTitle>
        <ProfileContainer>
          Nome da empresa: <NameContainer>{user.corporate_name}</NameContainer>
          Descrição:{' '}
          <DescriptionContainer
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Row>
            <InputControl>
              <InputLabel>Email:</InputLabel>
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputControl>
            <InputControl>
              <InputLabel>Celular:</InputLabel>
              <PhoneInput
                value={phoneMask(phone)}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputControl>
            <InputControl>
              <InputLabel>CEP:</InputLabel>
              <CepInput
                value={cepMask(cep)}
                onChange={(e) => setCep(e.target.value)}
              />
            </InputControl>
          </Row>
          <Button text="Salvar alterações" onClick={handleSaveChanges} />
          <Button
            color="red"
            text="Excluir sua conta"
            style={{ marginTop: 16 }}
            onClick={handleDeleteAccount}
          />
        </ProfileContainer>
      </MainContainer>
    </Base>
  )
}

export default Profile
