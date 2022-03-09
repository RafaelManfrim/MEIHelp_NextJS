import type { NextPage } from 'next'
import { Header } from '../../components/template/Header'
import { LoginPageContainer } from './styles'

const Login: NextPage = () => {
    return (
        <LoginPageContainer>
            <Header landingHeader />
        </LoginPageContainer>
    )
}

export default Login
