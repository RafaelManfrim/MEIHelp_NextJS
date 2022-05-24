import { ButtonHTMLAttributes } from "react"
import { ButtonComponent } from "./styles"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const Button = ({ text, ...rest }: ButtonProps) => {
    return (
        <ButtonComponent type="button" {...rest}>{text}</ButtonComponent>
    )
}
