import { Base } from '../../components/template'
import { Stocks } from './components/Stocks'
import { Products } from './components/Products'
import { Providers } from './components/Providers'

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './styles'

export interface ProviderDTO {
  id: number
  name: string
  email: string
  phone: string
}

export interface ProductDTO {
  id: number
  product: {
    id: number
    providers: ProviderDTO[]
    name: string
    category: number
    description: string
  }
  quantity: number
}

export interface StockDTO {
  id: number
  name: string
  stock_products: ProductDTO[]
}

export default function Stock() {
  return (
    <Base>
      <TabsRoot defaultValue='estoques'>
        <TabsList>
          <TabsTrigger value="estoques">Estoques</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
        </TabsList>
        <TabsContent value="estoques">
          <Stocks />
        </TabsContent>
        <TabsContent value="produtos">
          <Products />
        </TabsContent>
        <TabsContent value="fornecedores">
          <Providers />
        </TabsContent>
      </TabsRoot>
    </Base>
  )
}
