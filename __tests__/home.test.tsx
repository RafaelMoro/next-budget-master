import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../src/app/page'
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
 
describe('Home', () => {
  it('Show the login page', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Home />
      </AppRouterContextProviderMock>
  )
 
    expect(screen.getByRole('heading', { name: /bienvenido de vuelta/i })).toBeInTheDocument()
    expect(screen.getByText(/ingrese sus credenciales para entrar a su cuenta\./i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  describe('Validation form', () => {
    it('Validate email showing error if it is empty ', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      render(
        <AppRouterContextProviderMock router={{ push }}>
          <Home />
        </AppRouterContextProviderMock>
      )
    
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      await user.click(signInButton)
      expect(await screen.findByText(/Correo electrónico inválido/i))
    })

    it('Given a user filling the email wrong, show invalid email error ', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      render(
        <AppRouterContextProviderMock router={{ push }}>
          <Home />
        </AppRouterContextProviderMock>
      )
    
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      await user.type(emailInput, 'correo-electronico@a')
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      await user.click(signInButton)
      expect(await screen.findByText(/Correo electrónico inválido/i))
    })
  })
})