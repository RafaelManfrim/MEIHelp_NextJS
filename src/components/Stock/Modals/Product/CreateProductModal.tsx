import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as zod from 'zod'

import { ProductDTO, ProviderDTO } from '../../../../pages/stock';
import { api } from '../../../../services/api';
import { Button } from '../../../Button';

import { CloseButton, Collums, Content, FormGroup, Overlay } from '../styles';

interface Category {
  id: string;
  categoria: string;
}

const schema = zod.object({
  name: zod.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }).max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
  description: zod.string().min(3, { message: "A descrição deve ter no mínimo 3 caracteres." }).max(100, { message: 'A descrição deve ter no máximo 100 caracteres.' }),
})

type NewProductFormSchema = zod.infer<typeof schema>

interface CreateProductProps {
  onCreate: (product: ProductDTO) => void
  closeModal: () => void
}

export function CreateProductModal({ onCreate, closeModal }: CreateProductProps) {
  const [providers, setProviders] = useState<ProviderDTO[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { register, handleSubmit, formState, reset } = useForm<NewProductFormSchema>({
    resolver: zodResolver(schema)
  })

  async function handleCreateProduct(data: NewProductFormSchema) {
    const productData = {
      ...data,
      providers: selectedProviderId ? [selectedProviderId] : [],
      category: selectedCategoryId
    }

    try {
      const response = await api.post('/products/', { ...productData })
      onCreate(response.data)
      toast.success('Produto cadastrado com sucesso!')
      closeModal()
    } catch (err) {
      console.log(err)
      toast.error('Erro ao cadastrar o produto')
    }

    reset()
  }

  useEffect(() => {
    async function fetchProviders() {
      setIsLoading(true)
      try {
        const response = await api.get('/providers/')
        setProviders(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        toast.error('Erro ao carregar fornecedores.')
      }
    }

    async function fetchCategories() {
      setIsLoading(true)
      try {
        const response = await api.get('/products/list_all_categories/')
        setCategories(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        toast.error('Erro ao carregar a lista de categorias.')
      }
    }

    fetchProviders()
    fetchCategories()
  }, [])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Cadastrar produto</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <FormGroup>
            <label htmlFor="name">Nome:</label>
            <input
              placeholder='Digite o nome do produto'
              id="name"
              {...register("name")}
            />
            {formState.errors.name && <span>{formState.errors.name.message}</span>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="description">Descrição:</label>
            <textarea
              placeholder='Escreve uma descrição'
              id="description"
              {...register("description")}
            />
            {formState.errors.description && <span>{formState.errors.description.message}</span>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="category">Categoria</label>
            <select name="category" id="category" value={String(selectedCategoryId)} onChange={(e) => setSelectedCategoryId(Number(e.target.value))}>
              <option value='null'>Selecione uma categoria</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.categoria}</option>)}
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="provider">Fornecedor</label>
            <select name="provider" id="provider" value={String(selectedProviderId)} onChange={(e) => setSelectedProviderId(Number(e.target.value))}>
              <option value='null'>Selecione um fornecedor (opcional)</option>
              {providers.map(provider => <option key={provider.id} value={provider.id}>{provider.name}</option>)}
            </select>
          </FormGroup>
          <Collums style={{ marginTop: 16 }}>
            <Dialog.Close asChild>
              <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
            </Dialog.Close>
            <Button
              text="Cadastrar"
              type="submit"
              color="green-light"
              disabled={!selectedCategoryId || isLoading}
              onClick={handleSubmit(handleCreateProduct)}
            />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}