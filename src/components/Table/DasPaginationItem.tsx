import { DasPaginationButton } from "./styles"

interface PaginationItemProps {
  isCurrent?: boolean
  pageNumber: number
  onPageChange: (page: number) => void
}

export function DasPaginationItem({ isCurrent = false, pageNumber, onPageChange }: PaginationItemProps) {
  // return isCurrent ? (
  //   <Button size="sm" fontSize="xs" w="4" colorScheme="pink" disabled _disabled={{ bg: 'pink.500', cursor: 'default' }}>{pageNumber}</Button>
  // ) : (
  //   <Button size="sm" fontSize="xs" w="4" bg="gray.700" onClick={() => onPageChange(pageNumber)}>{pageNumber}</Button>
  // )
  return (
    <DasPaginationButton
      isCurrent={isCurrent}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </DasPaginationButton>
  )
}