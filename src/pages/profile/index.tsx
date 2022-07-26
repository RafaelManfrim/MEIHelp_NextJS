import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../services/api'
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
  const { user, signOut } = useAuth()
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [cep, setCep] = useState(user.cep || '')
  const [description, setDescription] = useState(user.description || '')

  async function handleSaveChanges() {
    const newCompanyData = {
      description,
      cep: normalizeCep(cep),
      phone: normalizePhone(phone),
      email
    }

    try {
      await api.patch('/companies/update_data/', { ...newCompanyData })
    } catch (error) {
      toast("Houve um erro ao atualizar seus dados, tente novamente mais tarde.")
    }
  }

  async function handleDeleteAccount() {
    try {
      await api.delete('/companies/delete/')
      signOut()
    } catch (error) {
      toast("Houve um erro ao deletar sua conta, tente novamente mais tarde.")
    }
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
