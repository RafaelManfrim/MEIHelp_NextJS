import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../../../components/Button';

import { CreateButtonContainer, SectionTitle } from "../styles";

export function Products() {
  return (
    <>
      <SectionTitle>Produtos</SectionTitle>
      <CreateButtonContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button text='Cadastrar produto' />
          </Dialog.Trigger>
        </Dialog.Root>
      </CreateButtonContainer>
    </>
  )
}
