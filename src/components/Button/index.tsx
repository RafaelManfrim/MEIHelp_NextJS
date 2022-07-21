import { ButtonHTMLAttributes } from 'react'
import { ButtonComponent } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  color?: string
}

export const Button = ({ text, color, ...rest }: ButtonProps) => {
  return (
    <ButtonComponent type="button" color={color} {...rest}>
      {text}
    </ButtonComponent>
  )
}
