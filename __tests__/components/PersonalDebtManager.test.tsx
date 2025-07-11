import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PersonalDebtManager } from '@/features/IndebtedPeople/PersonalDebtManager'
import { useIndebtedPeople } from '@/shared/hooks/useIndebtedPeople'
// import { IndebtedPeopleUI } from '@/shared/types/records.types'

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

const PersonalDebtManagerWrapper = () => {
  const {
    openIndebtedPeopleModal,
    toggleIndebtedPeopleModal,
    addIndebtedPerson,
    validatePersonExist,
    indebtedPeopleUI,
    editPerson,
    openEditModal,
    removePerson
  } = useIndebtedPeople()

  return (
    <PersonalDebtManager
      indebtedPeople={indebtedPeopleUI}
      openModal={openIndebtedPeopleModal}
      editPerson={editPerson}
      toggleModal={toggleIndebtedPeopleModal}
      openEditModal={openEditModal}
      addIndebtedPerson={addIndebtedPerson}
      validatePersonExist={validatePersonExist}
      removePerson={removePerson}
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

  describe('Form validation', () => {
    it('Given a user clicking on the button, show form', async () => {
      const user = userEvent.setup()
      render(<PersonalDebtManagerWrapper />)

      // Click the button to open the modal
      const addButton = screen.getByRole('button', { name: /¿Quién te debe?/i })
      await user.click(addButton)

      // Verify the form modal is shown
      expect(screen.getByText('Agregar persona que te debe')).toBeInTheDocument()
      expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
      expect(screen.getByLabelText('Cantidad a deber')).toBeInTheDocument()
      expect(screen.getByLabelText('Cantidad pagada')).toBeInTheDocument()
      expect(screen.getByLabelText('Deuda pagada')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Agregar persona/i })).toBeInTheDocument()
    })

    it('Given a user leaving the name empty, it should show a validation error for the name to be required', async () => {
      const user = userEvent.setup()
      render(<PersonalDebtManagerWrapper />)

      // Click the button to open the modal
      const addButton = screen.getByRole('button', { name: /¿Quién te debe?/i })
      await user.click(addButton)

      // Click the submit button without filling the name
      const submitButton = screen.getByRole('button', { name: /Agregar persona/i })
      await user.click(submitButton)

      // Verify the validation error is shown
      expect(screen.getByText(/Por favor, ingrese el nombre de la persona/i)).toBeInTheDocument()
    })

    it('Given a user entering a name less than 3 characters, it should show a validation error for the name', async () => {
      const user = userEvent.setup()
      render(<PersonalDebtManagerWrapper />)

      // Click the button to open the modal
      const addButton = screen.getByRole('button', { name: /¿Quién te debe?/i })
      await user.click(addButton)

      // Enter a name with less than 3 characters
      const nameInput = screen.getByLabelText('Nombre completo')
      await user.clear(nameInput)
      await user.type(nameInput, 'Ab')

      // Click the submit button
      const submitButton = screen.getByRole('button', { name: /Agregar persona/i })
      await user.click(submitButton)

      // Verify the validation error is shown
      expect(screen.getByText(/El nombre debe contener más de 3 caracteres/i)).toBeInTheDocument()
    })

    it('Given a user entering a name more than 100 characters, it should show a validation error for the name', async () => {
      const user = userEvent.setup()
      render(<PersonalDebtManagerWrapper />)

      // Click the button to open the modal
      const addButton = screen.getByRole('button', { name: /¿Quién te debe?/i })
      await user.click(addButton)

      // Enter a name with more than 100 characters
      const nameInput = screen.getByLabelText('Nombre completo')
      await user.clear(nameInput)
      const longName = 'A'.repeat(101) // 101 characters
      await user.type(nameInput, longName)

      // Click the submit button
      const submitButton = screen.getByRole('button', { name: /Agregar persona/i })
      await user.click(submitButton)

      // Verify the validation error is shown
      expect(screen.getByText(/El nombre debe contener menos de 100 caracteres/i)).toBeInTheDocument()
    })
  })
})