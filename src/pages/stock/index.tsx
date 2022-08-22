import type { NextPage } from 'next'
import { Button } from '../../components/Button'

import { Base } from '../../components/template'

import { CreateStockButton, MainStocksContainer, StockContainer, StocksContainer, StocksContainerHeader, StocksContainerTitle } from './styles'

const Stock: NextPage = () => {
  const teste = [1, 2, 3]

  return (
    <Base>
      <MainStocksContainer>
        <StocksContainerHeader>
          <StocksContainerTitle>
            Estoques
          </StocksContainerTitle>
          <CreateStockButton>
            Criar um estoque
          </CreateStockButton>
        </StocksContainerHeader>
        <StocksContainer>
          {teste.map(test => (
            <StockContainer key={test}>
              Nome do estoque

              <div>
                Detalhes do estoque
                <div>
                  produto
                  <span>qtde</span>
                </div>
                <div>
                  categoria
                </div>
                <div>
                  fornecedor
                  <span>dados do fornecedor</span>
                  <span>telefone</span>
                  <span>email</span>
                </div>
                <div>
                  produto
                  <span>qtde</span>
                </div>
                <div>
                  categoria
                </div>
                <div>
                  fornecedor
                  <span>dados do fornecedor</span>
                  <span>telefone</span>
                  <span>email</span>
                </div>
                <div>
                  produto
                  <span>qtde</span>
                </div>
                <div>
                  categoria
                </div>
                <div>
                  fornecedor
                  <span>dados do fornecedor</span>
                  <span>telefone</span>
                  <span>email</span>
                </div>
              </div>
            </StockContainer>
          ))}
        </StocksContainer>
      </MainStocksContainer>
    </Base>
  )
}

export default Stock
