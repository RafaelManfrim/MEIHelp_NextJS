export const normalizeCnpj = (value: string) => {
  return value.replaceAll('.', '').replace('/', '').replace('-', '')
}

export const normalizeCep = (value: string) => {
  return value.replaceAll('-', '').replace('.', '')
}

export const normalizePhone = (value: string) => {
  return value
    .replaceAll('(', '')
    .replace(')', '')
    .replace('-', '')
    .replaceAll(' ', '')
}
