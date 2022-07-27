export const normalizeCnpj = (value: string) => {
  return value.replaceAll(/(\.|-|\/)/g, '')
}

export const normalizeCep = (value: string) => {
  return value.replaceAll(/(\.|-)/g, '')
}

export const normalizePhone = (value: string) => {
  return value.replaceAll(/(\(|\)| |-|)/g, '')
}
