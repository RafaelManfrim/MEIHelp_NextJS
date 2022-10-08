export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, '') // Permite somente números
    .replace(/(\d{2})(\d)/, '$1.$2') // Coloca ponto entre o segundo e o terceiro dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto entre o quinto e o sexo dígitos
    .replace(/(\d{3})(\d)/, '$1/$2') // Coloca uma barra entre o oitavo e o nono dígitos
    .replace(/(\d{4})(\d)/, '$1-$2') // Coloca um hífen entre o décimo e o décimo primeiro dígitos
    .replace(/(-\d{2})\d+?$/, '$1') // Permite digitar apenas 2 dígitos depois do hífen
}

export const phoneMask = (value: string) => {
  return value
    .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
    .replace(/(\d{2})(\d)/, '($1) $2') // coloca parenteses entre o segundo e o terceiro dígitos
    .replace(/(\d{5})(\d)/, '$1-$2') // coloca hífen entre o quinto e o sexto dígitos
    .replace(/(-\d{4})\d+?$/, '$1') // Permite digitar apenas 4 dígitos depois do hífen
}

export const cepMask = (value: string) => {
  return value
    .replace(/\D+/g, '') // Permite somente números
    .replace(/(\d{2})(\d)/, '$1.$2') // Coloca ponto entre o segundo e o terceiro dígitos
    .replace(/(\d{3})(\d)/, '$1-$2') // Coloca hífen entre o quinto e o sexto dígitos
    .replace(/(-\d{3})\d+?$/, '$1') // Permite digitar apenas 3 dígitos depois do hífen
}

export const dateMask = (value: string) => {
  return value
    .replace(/\D+/g, '') // Permite somente números
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca barra entre o segundo e o terceiro dígitos
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca barra entre o quinto e o sexto dígitos
    .replace(/(\d{4})(\d)/, '$1') // Permite digitar apenas 4 dígitos depois da barra
}
