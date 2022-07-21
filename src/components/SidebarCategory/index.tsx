import { SidebarCategoryContainer } from './styles'

interface SidebarCategoryProps {
  name: string
}

export const SidebarCategory = ({ name }: SidebarCategoryProps) => {
  return <SidebarCategoryContainer>{name}</SidebarCategoryContainer>
}
