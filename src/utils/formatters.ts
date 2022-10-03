export const dateFormatter = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}