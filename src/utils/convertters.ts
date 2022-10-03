import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const monthConverter = (month: number) => {
  return format(new Date(2021, month - 1), 'MMMM', { locale: ptBR })[0].toUpperCase() + format(new Date(2021, month - 1), 'MMMM', { locale: ptBR }).slice(1)
}
