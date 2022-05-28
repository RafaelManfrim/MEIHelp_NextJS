import type { NextPage } from 'next'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Base } from '../../components/template'
import { useAuth } from '../../contexts/AuthContext'

import { CepContainer, DescriptionContainer, EmailContainer, NameContainer, PhoneContainer, ProfileContainer } from './styles'

const Profile: NextPage = () => {
    const { user } = useAuth()
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [cep, srtCep] = useState(user.cep)

    return (
        <Base>
            <ProfileContainer>
                Nome da empresa: <NameContainer>{user.corporate_name}</NameContainer>
                Descrição: <DescriptionContainer defaultValue={user.description || ''} />
                Email: <EmailContainer value={email} />
                Celular: <PhoneContainer value={phone} />
                CEP: <CepContainer value={cep} />
                {/* <SaveButton></SaveButton> */}
                <Button text="Salvar alterações" />
            </ProfileContainer>
        </Base>
    )
}

export default Profile
