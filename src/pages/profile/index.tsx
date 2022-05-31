import type { NextPage } from 'next'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { useAuth } from '../../contexts/AuthContext'

import { CepContainer, DescriptionContainer, EmailContainer, MainContainer, NameContainer, PhoneContainer, ProfileContainer, ProfileTitle } from './styles'

const Profile: NextPage = () => {
    const { user } = useAuth()
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [cep, srtCep] = useState(user.cep)

    return (
        <Base>
            <MainContainer>
                <ProfileTitle>
                    Perfil
                </ProfileTitle>
                <ProfileContainer>
                    Nome da empresa: <NameContainer>{user.corporate_name}</NameContainer>
                    Descrição: <DescriptionContainer defaultValue={user.description || ''} />
                    Email: <EmailContainer value={email} />
                    Celular: <PhoneContainer value={phone} />
                    CEP: <CepContainer value={cep} />
                    <Button text="Salvar alterações" />
                    <Button color='red' text="Excluir sua conta" style={{ marginTop: 16 }} />
                </ProfileContainer>
            </MainContainer>
        </Base>
    )
}

export default Profile
