import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Base } from '../../components/template'
import { api } from '../../services/api'
import { cnpjMask } from '../../utils/masks'
import { UserContactInfo, UserContainer, UserInfo, UserLocalizationInfo, UsersContainer } from './styles'

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

const Meeting: NextPage = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get('/companies/all/')
                setUsers(response.data)
            } catch (err) {
                toast.error('Houve um erro ao encontrar outros MEIs')
                console.log(err)
            }
        }
        
        fetchUsers()
    }, [])

    return (
        <Base>
            <UsersContainer>
                {users.map(user => (
                    <UserContainer key={user.id}>
                        <UserInfo>
                            <strong>{user.corporate_name}</strong>
                            <p>CNPJ: {cnpjMask(user.cnpj)}</p>
                            <span>{user.description}</span>
                        </UserInfo>
                        <UserLocalizationInfo>
                            <strong>{user.city} - {user.uf}</strong>
                            <p>{user.cep}</p>
                        </UserLocalizationInfo>
                        <UserContactInfo>
                            <strong>{user.email}</strong>
                            <strong>{user.phone}</strong>
                        </UserContactInfo>
                    </UserContainer>
                ))}
            </UsersContainer>
        </Base>
    )
}

export default Meeting
