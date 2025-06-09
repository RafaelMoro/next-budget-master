import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgotPasswordPage from '@/app/forgot-password/page'
import QueryProviderWrapper from '@/app/QueryProviderWrapper'
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock'

describe('ForgotPasswordPage', () => {
  it('should render the forgot password page', () => {
    const push = jest.fn();
    render(
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={{ push }}>
          <ForgotPasswordPage />
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    )
    expect(screen.getByRole('heading', { name: /recupera tu cuenta en un momento/i })).toBeInTheDocument()
    expect(screen.getByText(/te mandaremos un enlace seguro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver/i })).toBeInTheDocument()
  })

  it('should allow typing in the email field', async () => {
    const user = userEvent.setup()
    const push = jest.fn();
    render(
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={{ push }}>
          <ForgotPasswordPage />
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    )
    const emailInput = screen.getByLabelText(/correo electrónico/i)
    await user.type(emailInput, 'test@example.com')
    expect(emailInput).toHaveValue('test@example.com')
  })
})
