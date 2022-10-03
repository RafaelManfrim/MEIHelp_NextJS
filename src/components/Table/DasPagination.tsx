import { DasPaginationItem } from './DasPaginationItem'
import { PaginationContainer } from './styles'

interface PaginationProps {
  currentPage: number
  yearsToPaginate: number[]
  onPageChange: (page: number) => void
}

export function DasPagination({ yearsToPaginate, currentPage, onPageChange }: PaginationProps) {
  return (
    <PaginationContainer>
      {yearsToPaginate.map(year => (
        <DasPaginationItem
          key={year}
          pageNumber={year}
          isCurrent={year === currentPage}
          onPageChange={onPageChange}
        />
      ))}
    </PaginationContainer>
  )
}
