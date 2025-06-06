import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
 
describe('Home', () => {
  it('renders a heading', () => {
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
  })
})