import type { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import bgImage from "../../../public/bg-login.jpg"
import logo from "../../../public/logo.png"
import { apiNoAuth } from '../../services/api'
import { cnpjMask, phoneMask } from '../../utils/masks'
import { useAuth } from '../../contexts/AuthContext'

import { LoginPageContainer, LoginFormContainer, LoginPageImageContainer, LoginForm, ChangeModeText, ChangeModeLink, LogoLogin, FormDescription, ErrorInformation } from './styles'

const Login: NextPage = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    const [error, setError] = useState('')
    const [registerStep, setRegisterStep] = useState<1 | 2>(1)
    const [loading, setLoading] = useState(false)
    const [cnpj, setCnpj] = useState('')
    const [normalizedCnpj, setNormalizedCnpj] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const { signIn } = useAuth()

    async function handleNextStep() {
        try {
            setLoading(true)
            const normalizedCnpj = cnpj.replaceAll('.', '').replace('/', '').replace('-', '')
            await apiNoAuth.post('/cnpj/validate/', { cnpj: normalizedCnpj })
            setNormalizedCnpj(normalizedCnpj)
            setEmail('')
            setPhoneNumber('')
            setCnpj('')
            setError('')
            setRegisterStep(2)
        } catch (err: any) {
            if (err.response.status === 400) {
                setError('O CNPJ informado é inválido ou ainda não foi cadastrado no Sefaz.')
            } else if (err.response.status === 401) {
                setError('O CNPJ informado precisa ser referente a uma MEI.')
            } else if (err.response.status === 429) {
                setError('O sistema está sobrecarregado, por favor, aguarde um instante.')
            } else if (err.response.status === 504) {
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
            if (password !== passwordConfirm) {
                setError('As senhas precisam ser iguais.')
                return
            }

            const data = {
                cnpj: normalizedCnpj,
                phone: phoneNumber,
                email,
                password,
            }

            const response = await apiNoAuth.post('/companies/register/', { ...data })

            if (response.status === 201) {
                toast.success('Sua conta foi criada!')
                setCnpj('')
                setNormalizedCnpj('')
                setEmail('')
                setPhoneNumber('')
                setPassword('')
                setPasswordConfirm('')
                setError('')
                setIsRegistering(false)
            }
        } catch (err: any) {
            if (err.response.status === 400) {
                setError('O CNPJ informado é inválido ou ainda não foi cadastrado no Sefaz.')
            } else if (err.response.status === 401) {
                setError('O CNPJ informado precisa ser referente a uma MEI.')
            } else if (err.response.status === 429) {
                setError('O sistema está sobrecarregado, por favor, aguarde um instante.')
            } else if (err.response.status === 504) {
                setError('O sistema está indisponível, por favor, tente novamente mais tarde.')
            } else {
                setError('Houve um erro inesperado, pedimos desculpas, por favor tente novamente mais tarde.')
            }
        }
    }

    function handleChangeIsRegistering() {
        setCnpj('')
        setNormalizedCnpj('')
        setPassword('')
        setPasswordConfirm('')
        setError('')
        setIsRegistering(!isRegistering)
        if (registerStep === 2) {
            setRegisterStep(1)
        }
    }

    async function handleSignIn() {
        setLoading(true)
        const normalizedCnpj = cnpj.replaceAll('.', '').replace('/', '').replace('-', '')
        try {
            await signIn(normalizedCnpj, password)
            setLoading(false)
        } catch (err: any) {
            if (err.message === 'No active account found with the given credentials') {
                setError('O e-mail ou a senha são inválidos.')
            } else {
                setError('Houve um erro inesperado')
            }
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
                                <Button text='Continuar' onClick={handleNextStep} />
                            </>
                        ) : (
                            <>
                                <FormDescription>
                                    Agora precisamos de mais informações.
                                </FormDescription>
                                <Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                <Input placeholder="Celular" value={phoneMask(phoneNumber)} onChange={e => setPhoneNumber(e.target.value)} />
                                <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                                <Input type="password" placeholder="Confirme sua senha" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                                {error && <ErrorInformation>{error}</ErrorInformation>}
                                <Button text='Registrar-se' onClick={handleRegisterAccount} />
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
                            Digite suas credenciais para acessar o sistema.
                        </FormDescription>
                        <Input
                            type="text"
                            value={cnpjMask(cnpj)}
                            onChange={e => setCnpj(e.target.value)}
                            placeholder="CNPJ"
                        />
                        <Input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {error && <ErrorInformation>{error}</ErrorInformation>}
                        <Button text="Entrar" onClick={handleSignIn} />
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
