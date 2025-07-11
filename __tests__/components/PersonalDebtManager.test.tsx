import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { PersonalDebtManager } from '@/features/IndebtedPeople/PersonalDebtManager'
import { IndebtedPeopleUI } from '@/shared/types/records.types'

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver

// const mockIndebtedPeople: IndebtedPeopleUI[] = [
//   {
//     name: 'Juan Pérez',
//     amount: 1000,
//     amountPaid: 200,
//     isPaid: false,
//     amountFormatted: '$1,000.00',
//     amountPaidFormatted: '$200.00',
//     remainingAmountFormatted: '$800.00',
//   },
//   {
//     name: 'María García',
//     amount: 500,
//     amountPaid: 500,
//     isPaid: true,
//     amountFormatted: '$500.00',
//     amountPaidFormatted: '$500.00',
//     remainingAmountFormatted: '$0.00',
//   },
// ]

const PersonalDebtManagerWrapper = ({
  indebtedPeople = [],
  openModal = false,
  editPerson = null,
}: {
  indebtedPeople?: IndebtedPeopleUI[]
  openModal?: boolean
  editPerson?: IndebtedPeopleUI | null
}) => {
  const mockToggleModal = jest.fn()
  const mockOpenEditModal = jest.fn()
  const mockAddIndebtedPerson = jest.fn()
  const mockRemovePerson = jest.fn()
  const mockValidatePersonExist = jest.fn()

  return (
    <PersonalDebtManager
      indebtedPeople={indebtedPeople}
      openModal={openModal}
      editPerson={editPerson}
      toggleModal={mockToggleModal}
      openEditModal={mockOpenEditModal}
      addIndebtedPerson={mockAddIndebtedPerson}
      validatePersonExist={mockValidatePersonExist}
      removePerson={mockRemovePerson}
    />
  )
}

describe('PersonalDebtManager', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should render the component with empty state', () => {
    render(<PersonalDebtManagerWrapper />)

    expect(screen.getByText('Personas que te deben')).toBeInTheDocument()
    expect(screen.getByText('¿Alguien más coopera con esta transacción? Registra aquí su parte para que no se te olvide.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /¿Quién te debe?/i })).toBeInTheDocument()
  })
})