import { useState } from "react"
import { render, screen } from "@testing-library/react"
import { Modal } from "flowbite-react"

import { AccountDetails } from "@/features/Accounts/AccountDetails"
import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"

const AccountDetailsWrapper = () => {
  const [openAccModal, setOpenAccModal] = useState<boolean>(true)
  const toggleAccModal = () => setOpenAccModal((prev) => !prev)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateAccAction = jest.fn((_acc: AccountModalAction) => {})

  const account: AccountsDisplay = {
    accountId: "12345",
    name: "HSBC clasica",
    amount: "$1,000.00",
    type: "Crédito",
    alias: "Ahorros",
    terminationFourDigits: 1234,
    terminationFourDigitsTransformed: "**1234",
    accountProvider: "mastercard"
  }

  return (
    <Modal show={openAccModal} onClose={toggleAccModal}>
      <AccountDetails
        account={account}
        updateAccAction={updateAccAction}
      />
    </Modal>
  )
}

describe('AccountDetails', () => {
  it('Show account details', () => {
    render(<AccountDetailsWrapper />)

    expect(screen.getByRole('heading', { name: /HSBC clasica/i })).toBeInTheDocument()
    expect(screen.getByText(/Balance: \$1,000.00/i)).toBeInTheDocument()
    expect(screen.getByText(/Tipo de cuenta: Crédito/i)).toBeInTheDocument()
    expect(screen.getByText(/Terminación: \*\*1234/i)).toBeInTheDocument()
    expect(screen.getByText(/Alias: Ahorros/i)).toBeInTheDocument()
    expect(screen.getByText(/Tarjeta emitida por: Mastercard/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument()
  })
})