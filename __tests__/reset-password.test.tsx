import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

import ResetPasswordPage from "@/app/reset-password/[slug]/page"
import QueryProviderWrapper from "@/app/QueryProviderWrapper"


describe('ResetPasswordPage', () => {
  it('Show reset password page', async () => {
    const mockParams = { params: Promise.resolve({ slug: 'some-slug' }) }
    const Page = await ResetPasswordPage(mockParams)
    render(
      <QueryProviderWrapper>
        {Page}
      </QueryProviderWrapper>
    )
    expect(await screen.findByRole('heading', { name: /estás a un paso de volver/i })).toBeInTheDocument()
    expect(screen.getByText(/Ingresa tu nueva contraseña para reestablecer tu contraseña y continuar con el acceso seguro a tu cuenta./i)).toBeInTheDocument()
    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reestablecer contraseña/i })).toBeInTheDocument()
  })

  describe('Form Validation', () => {
    it('Password fields are required', async () => {
      const user = userEvent.setup()
      const mockParams = { params: Promise.resolve({ slug: 'some-slug' }) }
      const Page = await ResetPasswordPage(mockParams)
      render(
        <QueryProviderWrapper>
          {Page}
        </QueryProviderWrapper>
      )

      // const pwdInput = screen.getByTestId('password')
      // const confirmPwdInput = screen.getByTestId('confirmPassword')
      const resetButton = screen.getByRole('button', { name: /reestablecer contraseña/i })
      await user.click(resetButton)
      expect(await screen.findByText(/Por favor, ingrese una contraseña/i)).toBeInTheDocument()
      expect(screen.getByText(/Por favor, ingrese su contraseña nuevamente/i)).toBeInTheDocument()
    })
  })
})