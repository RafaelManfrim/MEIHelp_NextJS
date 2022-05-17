import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { LoginPageContainer, LoginFormContainer, LoginPageImageContainer, LoginForm, ChangeModeText, ChangeModeLink, LogoLogin, FormDescription } from './styles'
import bgImage from "../../../public/bg-login.jpg"
import logo from "../../../public/logo.png"

const Login: NextPage = () => {
    const [isRegistering, setIsRegistering] = useState(true)
    const [registerStep, setRegisterStep] = useState<1 | 2>(1)

    async function handleNextStep() {
        // Verificar dados em localStorage para saber se a requisição é necessária.
        // Buscar se é um CNPJ válido
        // Salvar dados necessários nos estados
        // Salvar timestamp da requisição para evitar flood
        // Salvar dados temporáriamente em localStorage
        setRegisterStep(2)
    }

    async function handleRegisterAccount() {
        // Enviar requisição ao backend criando a conta
        // Se a conta for criada, limpar os estados e redirecionar o usuário para login
        setIsRegistering(false)
    }

    function handleChangeIsRegistering() {
        setIsRegistering(!isRegistering)
        if(registerStep === 2) {
            setRegisterStep(1)
        }
    }

    return (
        <LoginPageContainer>
            <LoginFormContainer>
                {isRegistering ? (
                    <LoginForm>
                        <LogoLogin>
                            <Image src={logo} alt="MEIHelp" layout="responsive" />
                        </LogoLogin>
                        {registerStep === 1 ? (
                            <>
                                <FormDescription>
                                    Para começar, precisamos do seu CNPJ.
                                </FormDescription>
                                <Input type="text" placeholder="CNPJ" />
                                <Button text='Continuar' onClick={() => handleNextStep()} />
                            </>
                        ) : (
                            <>
                                <FormDescription>
                                    Agora precisamos de mais informações.
                                </FormDescription>
                                <Input type="password" placeholder="Senha" />
                                <Input type="password" placeholder="Confirme sua senha" />
                                <Button text='Registrar-se' onClick={() => handleRegisterAccount()} />
                            </>
                        )}
                        <ChangeModeText>
                            Já possui uma conta? <ChangeModeLink onClick={handleChangeIsRegistering}>Clique aqui!</ChangeModeLink>
                        </ChangeModeText>
                    </LoginForm>
                ) : (
                    <LoginForm>
                        <LogoLogin>
                            <Image src={logo} alt="MEIHelp" layout="responsive" />
                        </LogoLogin>
                        <FormDescription>
                            Agora digite suas credenciais para acessar o sistema.
                        </FormDescription>
                        <Input type="text" placeholder="E-mail" />
                        <Input type="text" placeholder="CNPJ" />
                        <Input type="text" placeholder="Senha" />
                        <Button text="Logar" />
                        <ChangeModeText>
                            Ainda não possui uma conta? <ChangeModeLink onClick={handleChangeIsRegistering}>Registre-se!</ChangeModeLink>
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
