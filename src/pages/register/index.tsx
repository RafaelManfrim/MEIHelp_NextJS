import type { NextPage } from 'next'
import { Header } from '../../components/template/Header'
import { RegisterPageContainer } from './styles'

const Register: NextPage = () => {
    return (
        <RegisterPageContainer>
            <Header landingHeader />
        </RegisterPageContainer>
    )
}

export default Register
