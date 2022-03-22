import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { LoginPageContainer, LoginFormContainer, LoginPageImageContainer, LoginForm, ChangeModeText, ChangeModeLink, LogoLogin } from './styles'
import bgImage from "../../../public/bg-login.jpg"
import logo from "../../../public/logo.png"

const Login: NextPage = () => {
    const [isRegistering, setIsRegistering] = useState(true)

    function handleChageIsRegistering() {
        setIsRegistering(!isRegistering)
    }

    return (
        <LoginPageContainer>
            <LoginFormContainer>
                {isRegistering ? (
                    <LoginForm>
                        <LogoLogin>
                            <Image src={logo} alt="MEIHelp" layout="responsive" />
                        </LogoLogin>
                        <Input type="text" placeholder="CNPJ" />
                        <Input type="text" placeholder="Razão social" />
                        <Input type="text" placeholder="Nome fantasia" />
                        <Input type="text" placeholder="Telefone" />
                        <Input type="email" placeholder="E-mail" />
                        <Input type="password" placeholder="Senha" />
                        <Button text="Registrar-se" />
                        <ChangeModeText>
                            Já possui uma conta? <ChangeModeLink onClick={handleChageIsRegistering}>Clique aqui!</ChangeModeLink>
                        </ChangeModeText>
                    </LoginForm>
                ) : (
                    <LoginForm>
                        <LogoLogin>
                            <Image src={logo} alt="MEIHelp" layout="responsive" />
                        </LogoLogin>
                        <Input type="text" placeholder="E-mail" />
                        <Input type="text" placeholder="CNPJ" />
                        <Input type="text" placeholder="Senha" />
                        <Button text="Logar" />
                        <ChangeModeText>
                            Ainda não possui uma conta? <ChangeModeLink onClick={handleChageIsRegistering}>Registre-se!</ChangeModeLink>
                        </ChangeModeText>
                    </LoginForm>
                )}
            </LoginFormContainer>
            <LoginPageImageContainer>
                <Image src={bgImage} alt="" layout="fill" />
            </LoginPageImageContainer>
        </LoginPageContainer>
    )
}

export default Login
