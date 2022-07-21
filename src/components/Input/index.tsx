import { InputHTMLAttributes } from 'react'
import { InputComponent } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = ({ ...rest }: InputProps) => {
  return <InputComponent {...rest} />
}
