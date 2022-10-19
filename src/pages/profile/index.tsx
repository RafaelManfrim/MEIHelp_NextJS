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
  ActionsContainer,
  CepInput,
  DeleteAccountButton,
  DescriptionContainer,
  EmailInput,
  InputControl,
  InputLabel,
  MainContainer,
  NameContainer,
  PhoneInput,
  ProfileContainer,
  SectionTitle,
  Row,
  DissatisfactionContainerTitle,
} from '../../styles/pages/profile'

const Profile: NextPage = () => {
  const { user, signOut } = useAuth()
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [cep, setCep] = useState(user.cep || '')
  const [description, setDescription] = useState(user.description || '')

  function handleCancelChanges() {
    setEmail(user.email || '')
    setPhone(user.phone || '')
    setCep(user.cep || '')
    setDescription(user.description || '')
  }

  async function handleSaveChanges() {
    const newCompanyData = {
      description,
      cep: normalizeCep(cep),
      phone: normalizePhone(phone),
      email
    }

    try {
      await api.patch('/companies/update_data/', { ...newCompanyData })
      toast.success('Dados atualizados com sucesso!')
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
        <SectionTitle>Perfil</SectionTitle>
        <ProfileContainer>
          <NameContainer>{user.corporate_name}</NameContainer>
          Descrição:
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
          <ActionsContainer>
            <Button text="Cancelar alterações" onClick={handleCancelChanges} color="dark-gray" />
            <Button text="Salvar alterações" onClick={handleSaveChanges} />
          </ActionsContainer>
        </ProfileContainer>
        <DissatisfactionContainerTitle>Não está satisfeito com nosso serviço?</DissatisfactionContainerTitle>
        <ProfileContainer>
          <p>Contate-nos no email <strong>sistemameihelp@gmail.com</strong> e faremos o possível para melhorar sua experiência com nosso sistema.</p>
          <p>Se mesmo assim o problema não for solucionado, use o botão abaixo para se desvincular de nossos serviços, seu dados serão completamente deletados de nossa base de dados para sua segurança, o MEIHelp agradece!</p>
        </ProfileContainer>
        <DeleteAccountButton onClick={handleDeleteAccount}>Excluir sua conta</DeleteAccountButton>
      </MainContainer>
    </Base>
  )
}

export default Profile
