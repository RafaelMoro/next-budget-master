import '@testing-library/jest-dom'
import QueryProviderWrapper from "@/app/QueryProviderWrapper";
import RegisterPage from "@/app/register/page";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe('Register', () => {
  it ('Show register page', () => {
    render(
      <QueryProviderWrapper>
        <RegisterPage />
      </QueryProviderWrapper>
    )

    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument()
    expect(screen.getByText(/llene la siguiente información para crear su cuenta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/primer nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/segundo nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument()
  })

  it.skip('should show the second screen after entering correctly personal information', async () => {
    const user = userEvent.setup()
    render(
      <QueryProviderWrapper>
        <RegisterPage />
      </QueryProviderWrapper>
    )
    const firstNameInput = screen.getByLabelText(/primer nombre/i)
    const middleNameInput = screen.getByLabelText(/segundo nombre/i)
    const lastNameInput = screen.getByLabelText(/apellido/i)
    const nextButton = screen.getByRole('button', { name: /siguiente/i })
    await user.type(firstNameInput, 'John')
    await user.type(middleNameInput, 'Paul')
    await user.type(lastNameInput, 'Doe')
    await user.click(nextButton)
  
    expect(await screen.findByText(/Ingrese su correo electronico y contraseña./i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /creat cuenta/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument()
  })
})