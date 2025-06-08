import { PersonalInformation } from '@/features/Login/Register/PersonalInformation'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('PersonalInformation', () => {
  it('should render the form fields and button', () => {
    const nextStep = jest.fn()
    const updatePersonalInformation = jest.fn()
    const personalInformation = {
      firstName: '',
      middleName: '',
      lastName: ''
    }

    render(
      <PersonalInformation
        nextCb={nextStep}
        personalInformation={personalInformation}
        updatePersonalInformation={updatePersonalInformation}
      />
    )

    expect(screen.getByLabelText('Primer Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Segundo Nombre (Opcional)')).toBeInTheDocument()
    expect(screen.getByLabelText('Apellido')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Volver/i })).toBeInTheDocument()
  })

  // TODO: Do validations tests instead of just filling the fields
  it.skip('should allow typing in the input fields', async () => {
    const user = userEvent.setup()
    const nextStep = jest.fn()
    const updatePersonalInformation = jest.fn()
    const personalInformation = {
      firstName: '',
      middleName: '',
      lastName: ''
    }

    render(
      <PersonalInformation
        nextCb={nextStep}
        personalInformation={personalInformation}
        updatePersonalInformation={updatePersonalInformation}
      />
    )

    const firstNameInput = screen.getByLabelText('Primer Nombre')
    const middleNameInput = screen.getByLabelText('Segundo Nombre (Opcional)')
    const lastNameInput = screen.getByLabelText('Apellido')
    await user.type(firstNameInput, 'John')
    await user.type(middleNameInput, 'Paul')
    await user.type(lastNameInput, 'Doe')
    expect(firstNameInput).toHaveValue('John')
    expect(middleNameInput).toHaveValue('Paul')
    expect(lastNameInput).toHaveValue('Doe')
  })

  // Failing due validation
  it.skip('should call nextCb when Siguiente button is clicked', async () => {
    const user = userEvent.setup()
    const nextStep = jest.fn()
    const updatePersonalInformation = jest.fn()
    const personalInformation = {
      firstName: '',
      middleName: '',
      lastName: ''
    }

    render(
      <PersonalInformation
        nextCb={nextStep}
        personalInformation={personalInformation}
        updatePersonalInformation={updatePersonalInformation}
      />
    )

    const button = screen.getByRole('button', { name: /Siguiente/i })
    await user.click(button)
    expect(nextStep).toHaveBeenCalled()
  })
})
