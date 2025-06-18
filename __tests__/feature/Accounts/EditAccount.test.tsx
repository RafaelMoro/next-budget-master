import { useState } from "react"
import { Modal } from "flowbite-react"
import { render, screen } from "@testing-library/react"

import QueryProviderWrapper from "@/app/QueryProviderWrapper"
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock"
import { EditAccount } from "@/features/Accounts/EditAccount"
import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"

const EditAccountWrapper = ({
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
          <EditAccount
            account={account}
            closeModal={closeModal}
            updateAccAction={updateAccAction}
          />
        </Modal>
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  )
}

describe('EditAccount', () => {
  it('Show edit account', () => {
    const push = jest.fn()
    const closeModal = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateAccAction = jest.fn((_acc: AccountModalAction) => {})

    render(<EditAccountWrapper closeModal={closeModal} updateAccAction={updateAccAction} push={push} />)

    expect(screen.getByText(/HSBC clasica/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Volver/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Titulo de la cuenta')).toBeInTheDocument()
    expect(screen.getByLabelText('Alias')).toBeInTheDocument()
    expect(screen.getByLabelText('Terminación de la cuenta')).toBeInTheDocument()
    expect(screen.getByLabelText('Saldo de la cuenta')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tipo de cuenta: Crédito' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Proveedor: Visa' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument()
  })
})