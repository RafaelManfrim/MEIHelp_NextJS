import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Button } from '../../../Button';
import { CloseButton, Collums, Content, ModalMessage, Overlay } from '../styles';

interface RemoveProviderFromProductModalProps {
  onDelete: () => void
}

export function RemoveProviderFromProductModal({ onDelete }: RemoveProviderFromProductModalProps) {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content onEscapeKeyDown={(e) => e.preventDefault()}>
        <Dialog.Title>Remover fornecedor</Dialog.Title>
        <CloseButton>
          <X weight='fill' size='20' />
        </CloseButton>
        <ModalMessage>
          Tem certeza que deseja remover esse fornecedor?
        </ModalMessage>
        <Collums style={{ marginTop: 16 }}>
          <Dialog.Close asChild>
            <Button text="Cancelar" color="gray" style={{ color: "#222" }} />
          </Dialog.Close>
          <Button text="Confirmar" type="button" color="red" onClick={onDelete} />
        </Collums>
      </Content>
    </Dialog.Portal>
  )
}