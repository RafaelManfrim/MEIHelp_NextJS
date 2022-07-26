import type { NextPage } from 'next'
import { Base } from '../../components/template'

const Stock: NextPage = () => {
  return (
    <Base>
      <div>
        <div>
          Estoques
        </div>
        <div>
          menu de cada estoque

          <div>
            estoque details
            <div>
              produto
              <span>Quantidade em estoque</span>
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
        </div>
      </div>
    </Base>
  )
}

export default Stock
