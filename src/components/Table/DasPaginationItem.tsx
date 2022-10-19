import { DasPaginationButton } from "./styles"

interface PaginationItemProps {
  isCurrent?: boolean
  pageNumber: number
  onPageChange: (page: number) => void
}

export function DasPaginationItem({ isCurrent = false, pageNumber, onPageChange }: PaginationItemProps) {
  return (
    <DasPaginationButton
      isCurrent={isCurrent}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </DasPaginationButton>
  )
}