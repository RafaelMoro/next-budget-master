import { useState } from "react"
import { render, screen } from "@testing-library/react"
import { Modal } from "flowbite-react"
import userEvent from '@testing-library/user-event';

import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock"
import QueryProviderWrapper from "@/app/QueryProviderWrapper"
import { DeleteAccount } from "@/features/Accounts/DeleteAccount"
import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"

const DeleteAccountWrapper = ({
  closeModal,
  updateAccAction,
  push
}: {
  closeModal: () => void
  updateAccAction: (acc: AccountModalAction) => void
  push: () => void
}) => {
  const [openAccModal, setOpenAccModal] = useState<boolean>(true)
  const toggleAccModal = () => setOpenAccModal((prev) => !prev)

  const account: AccountsDisplay = {
    accountId: "12345",
    name: "HSBC clasica",
    amount: "$1,000.00",
    type: "Crédito",
    alias: "Ahorros",
    terminationFourDigits: 1234,
    terminationFourDigitsTransformed: "**1234",
    accountProvider: "visa"
  }

  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push }}>
        <Modal show={openAccModal} onClose={toggleAccModal}>
          <DeleteAccount
            account={account}
            closeModal={closeModal}
            updateAccAction={updateAccAction}
          />
        </Modal>
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  )
}

describe('DeleteAccount', () => {
  it('Show delete account', () => {
    const push = jest.fn()
    const closeModal = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateAccAction = jest.fn((_acc: AccountModalAction) => {})

    render(<DeleteAccountWrapper closeModal={closeModal} updateAccAction={updateAccAction} push={push} />)

    expect(screen.getByRole('heading', { name: /Eliminar HSBC clasica/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Volver/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Estás por eliminar tu cuenta/i })).toBeInTheDocument()
    expect(screen.getByText(/¿Estás seguro que deseas continuar?/i)).toBeInTheDocument()
    expect(screen.getByText('Estás por eliminar tu cuenta de forma permanente. Si estás completamente seguro, continúa. No podrás recuperar tu información después.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument()
  })

  it('Given a user clicking on cancel button, the modal should be closed', async () => {
      const user = userEvent.setup();
      const push = jest.fn()
      const closeModal = jest.fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updateAccAction = jest.fn((_acc: AccountModalAction) => {})
      render(<DeleteAccountWrapper closeModal={closeModal} updateAccAction={updateAccAction} push={push} />)
  
      const cancelButton = screen.getByRole('button', { name: /Cancelar/i })
      await user.click(cancelButton)
      expect(updateAccAction).toHaveBeenCalledWith('view')
    })
  
    it('Given a user clicking on go back button, the modal action should be view', async () => {
      const user = userEvent.setup();
      const push = jest.fn()
      const closeModal = jest.fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updateAccAction = jest.fn((_acc: AccountModalAction) => {})
      render(<DeleteAccountWrapper closeModal={closeModal} updateAccAction={updateAccAction} push={push} />)
  
      const goBackButton = screen.getByRole('button', { name: /Volver/i })
      await user.click(goBackButton)
      expect(updateAccAction).toHaveBeenCalledWith('view')
    })
})