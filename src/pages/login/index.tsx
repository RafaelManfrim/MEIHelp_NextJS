import type { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import bgImage from "../../../public/bg-login.jpg"
import logo from "../../../public/logo.png"
import { api } from '../../services/api'
import { cnpjMask } from '../../utils/masks'

import { LoginPageContainer, LoginFormContainer, LoginPageImageContainer, LoginForm, ChangeModeText, ChangeModeLink, LogoLogin, FormDescription, ErrorInformation } from './styles'

const Login: NextPage = () => {
    const [isRegistering, setIsRegistering] = useState(true)
    const [error, setError] = useState('')
    const [registerStep, setRegisterStep] = useState<1 | 2>(1)
    const [loading, setLoading] = useState(false)
    const [cnpj, setCnpj] = useState('')
    const [normalizedCnpj, setNormalizedCnpj] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    async function handleNextStep() {
        try {
            setLoading(true)
            const normalizedCnpj = cnpj.replaceAll('.', '').replace('/', '').replace('-', '')
            const response = await api.post('/cnpj/validate/', { cnpj: normalizedCnpj })
            if(response.status === 200){
                setNormalizedCnpj(normalizedCnpj)
                setCnpj('')
                setError('')
                setRegisterStep(2)
            }
        } catch (err: any){
            if(err.response.status === 400) {
                setError('O CNPJ informado é inválido ou ainda não foi cadastrado no Sefaz.')
            } else if(err.response.status === 401) {
                setError('O CNPJ informado precisa ser referente a uma MEI.')
            } else if(err.response.status === 429) {
                setError('O sistema está sobrecarregado, por favor, aguarde um instante.')
            } else if(err.response.status === 504) {
                setError('O sistema está indisponível, por favor, tente novamente mais tarde.')
            } else {
                setError('Houve um erro inesperado, pedimos desculpas, por favor tente novamente mais tarde.')
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleRegisterAccount() {
        try {
            if(password !== passwordConfirm) {
                setError('As senhas precisam ser iguais.')
                return
            }
            // Enviar requisição buscando dados do CNPJ
            // Receber dados e montar um objeto para enviar ao backend
            const response = await axios.get('https://receitaws.com.br/v1/cnpj/' + normalizedCnpj)
            const dadosMei = response.data

            const data = {
                cnpj: normalizedCnpj,
                cep: dadosMei.cep,
                corporate_name: dadosMei.name,
                //
            }

            await api.post

            // Enviar requisição ao backend criando a conta
            // Se a conta for criada, limpar os estados e redirecionar o usuário para login
        } catch (err) {
            setError('Houve um erro inesperado, pedimos desculpas, por favor tente novamente mais tarde.')
        }
        setIsRegistering(false)
    }

    function handleChangeIsRegistering() {
        setCnpj('')
        setError('')
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
                                <Input 
                                    type="text" 
                                    value={cnpjMask(cnpj)}
                                    onChange={e => setCnpj(e.target.value)}
                                    placeholder="CNPJ" 
                                />
                                {error && <ErrorInformation>{error}</ErrorInformation>}
                                <Button text='Continuar' onClick={() => handleNextStep()} />
                            </>
                        ) : (
                            <>
                                <FormDescription>
                                    Agora precisamos de mais informações.
                                </FormDescription>
                                <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                                <Input type="password" placeholder="Confirme sua senha" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                                {error && <ErrorInformation>{error}</ErrorInformation>}
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
