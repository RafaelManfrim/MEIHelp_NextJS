import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../../../components/Button';

import { CreateButtonContainer, SectionTitle } from "../styles";

export function Providers() {
  return (
    <>
      <SectionTitle>Fornecedores</SectionTitle>
      <CreateButtonContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button text='Cadastrar fornecedor' />
          </Dialog.Trigger>
        </Dialog.Root>
      </CreateButtonContainer>
    </>
  )
}
