import { render, screen } from "@testing-library/react"

import ResetPasswordPage from "@/app/reset-password/[slug]/page"
import QueryProviderWrapper from "@/app/QueryProviderWrapper"

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'mocked-theme' })),
    set: jest.fn(),
  })),
}));

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
})