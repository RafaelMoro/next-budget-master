import '@testing-library/jest-dom'
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import HomePage from '../src/app/page'
import QueryProviderWrapper from "@/app/QueryProviderWrapper";
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ session: 'session-mock' })),
    set: jest.fn(),
  })),
}));

const Home = async ({ push }: { push: () => void }) => {
  const Page = await HomePage()
  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push }}>
        {Page}
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  )
}

describe('Home', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  })

  it('Show the login page', async () => {
    const push = jest.fn();
    render(await Home({ push }))
 
    expect(screen.getByRole('heading', { name: /bienvenido de vuelta/i })).toBeInTheDocument()
    expect(screen.getByText(/ingrese sus credenciales para entrar a su cuenta\./i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  describe('Validation form', () => {
    it('Given the email being empty, show an error to the user', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      render(await Home({ push }))
    
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      const pwdInput = screen.getByLabelText(/contraseña/i)
      await user.type(pwdInput, '1')
      await user.click(signInButton)
      expect(await screen.findByText(/Por favor, ingrese su correo electrónico/i))
    })

    it('Given a user filling the email wrong, show invalid email error ', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      render(await Home({ push }))
    
      const pwdInput = screen.getByLabelText(/contraseña/i)
      await user.type(pwdInput, '1')
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      await user.type(emailInput, 'correo-electronico@a')
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      await user.click(signInButton)
      expect(await screen.findByText(/Correo electrónico inválido/i))
    })

    it('Given a user leaving the password empty, show password required error', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      render(await Home({ push }))
    
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      await user.click(signInButton)
      expect(await screen.findByText(/Por favor, ingrese su contraseña/i))
    })
  })

  describe('Send login form validations', () => {
    it('Given a user entering wrong email or password, show error', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      mockedAxios.post.mockRejectedValue({
        code: 'ERR_BAD_REQUEST',
        config: null,
        message: 'Request failed with status code 401',
        name: 'AxiosError',
        request: null,
        response: {
          data: {
            message: 'Email or Password incorrect.'
          }
        }
      })

      render(await Home({ push }))

      const pwdInput = screen.getByLabelText(/contraseña/i)
      await user.type(pwdInput, '123')
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      await user.type(emailInput, 'correo-electronico@a.com')
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      await user.click(signInButton)
      expect(await screen.findByText(/Correo electronico o contraseña incorrecta/i))
    })

    it('Given a user entering email or password correctly, redirect to dashboard', async () => {
      const user = userEvent.setup()
      const push = jest.fn();
      mockedAxios.post.mockResolvedValue({
        error: null,
        message: null,
        success: true,
        version: "v1.2.0",
        data: {
          user: {
            _id: "656ce2abfe380684665e92a3",
            email: "rafael.moro.galindo@gmail.com",
            firstName: "Jose",
            lastName: "Moro Galindo",
            middleName: "Rafael"
          }
        }
      })

      render(await Home({ push }))

      const pwdInput = screen.getByLabelText(/contraseña/i)
      await user.type(pwdInput, '123')
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      await user.type(emailInput, 'correo-electronico@a.com')
      const signInButton = screen.getByRole('button', { name: /iniciar sesión/i })
      await user.click(signInButton)
      await waitFor(() => {
        expect(push).toHaveBeenCalledWith(DASHBOARD_ROUTE)
      }, { timeout: 2000 })
    })
  })
})