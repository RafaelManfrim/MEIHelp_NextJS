import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'

import { DasPagination } from '../../components/Table/DasPagination'
import { Base } from '../../components/template'
import { api } from '../../services/api'
import { monthConverter } from '../../utils/convertters'
import { dateFormatter } from '../../utils/formatters'

import { DasSituation, DasTable, MainContainer, SectionTitle } from '../../styles/pages/das'

import 'react-loading-skeleton/dist/skeleton.css'
interface DasDTO {
  id: number
  mes: number
  ano: number
  apurado: string
  situacao: string
  principal: string
  multa: string
  juros: string
  total: string
  data_vencimento: string | null
  data_acolhimento: string | null
  updated_at: string
  url_das: string | null
}

const Das: NextPage = () => {
  const [dasList, setDasList] = useState<DasDTO[]>([])
  const [loadingDasList, setLoadingDasList] = useState(true)
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear())

  const yearsToPaginate = dasList.map(das => das.ano).filter((value, index, self) => self.indexOf(value) === index)

  const filteredDasList = dasList.filter(das => das.ano === yearSelected)

  useEffect(() => {
    async function fetchDasList() {
      setLoadingDasList(true)
      try {
        const response = await api.get('/das/list_user_das/')
        setDasList(response.data)
      } catch (err) {
        console.log(err)
        toast.error('Houve um erro ao buscar sua lista de DAS')
      } finally {
        setLoadingDasList(false)
      }
    }

    fetchDasList()
  }, [])

  return (
    <Base>
      <MainContainer>
        <SectionTitle>Documento de Arrecadação do Simples Nacional</SectionTitle>
        <DasTable>
          <thead>
            <tr>
              <th>Período de apuração</th>
              <th>Apurado</th>
              <th>Situação</th>
              <th>Principal</th>
              <th>Multa</th>
              <th>Juros</th>
              <th>Total</th>
              <th>Data de Vencimento</th>
              <th>Data de Acolhimento</th>
              <th>Boleto</th>
            </tr>
          </thead>
          <tbody>
            {loadingDasList ? new Array(12).fill(10).map((skeleton, i) => (
              <tr key={i}>
                {new Array(skeleton).fill(10).map((skeleton, i) => (
                  <td key={i}><Skeleton /></td>
                ))}
              </tr>
            )) : filteredDasList.map(das => (
              <tr key={das.id}>
                <td>{`${monthConverter(das.mes)}/${das.ano}`}</td>
                <td>{das.apurado}</td>
                <DasSituation situacao={das.situacao}>{das.situacao}</DasSituation>
                <td>{das.principal}</td>
                <td>{das.multa}</td>
                <td>{das.juros}</td>
                <td>{das.total}</td>
                <td>{das.data_vencimento ? dateFormatter(das.data_vencimento) : '-'}</td>
                <td>{das.data_acolhimento ? dateFormatter(das.data_acolhimento) : '-'}</td>
                <td>
                  {das.url_das ? (
                    <a href={das.url_das} target="_blank" rel="noreferrer">
                      Acessar
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </DasTable>
        <DasPagination
          yearsToPaginate={yearsToPaginate}
          currentPage={yearSelected}
          onPageChange={setYearSelected}
        />
      </MainContainer>
    </Base>
  )
}

export default Das
