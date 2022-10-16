import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as zod from 'zod'

import { ProductDTO } from '../../../../pages/stock';
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

type EditedProductFormSchema = zod.infer<typeof schema>

interface EditProductProps {
  onEdit: (product: ProductDTO) => void
  closeModal: () => void
  product: ProductDTO
}

export function EditProductModal({ product, onEdit, closeModal }: EditProductProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { register, handleSubmit, formState, reset } = useForm<EditedProductFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      description: product.description,
    }
  })

  async function handleEditProduct(data: EditedProductFormSchema) {
    const productData = {
      ...data,
      category: selectedCategoryId
    }

    try {
      const response = await api.patch(`/products/${product.id}/`, { ...productData })
      onEdit(response.data)
      toast.success('Produto editado com sucesso!')
      closeModal()
    } catch (err) {
      console.log(err)
      toast.error('Erro ao editar o produto')
    }

    reset()
  }

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true)
      try {
        const response = await api.get('/products/list_all_categories/')
        const productCategory = response.data.find((category: Category) => category.categoria === product.category)
        setCategories(response.data)
        setSelectedCategoryId(productCategory.id)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        toast.error('Erro ao carregar a lista de categorias.')
      }
    }

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
        <form onSubmit={handleSubmit(handleEditProduct)}>
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
          <Collums style={{ marginTop: 16 }}>
            <Dialog.Close asChild>
              <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
            </Dialog.Close>
            <Button
              text="Editar"
              type="submit"
              color="light-blue"
              disabled={!selectedCategoryId || isLoading}
              onClick={handleSubmit(handleEditProduct)}
            />
          </Collums>
        </form>
      </Content>
    </Dialog.Portal>
  )
}