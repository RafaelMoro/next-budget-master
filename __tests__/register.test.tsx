import '@testing-library/jest-dom'
import axios from 'axios';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import QueryProviderWrapper from "@/app/QueryProviderWrapper";
import RegisterPage from "@/app/register/page";
import { ERROR_CREATE_USER_TITLE, SUCCESS_CREATE_USER_MESSAGE, SUCCESS_CREATE_USER_TITLE } from '@/shared/constants/Global.constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('Register', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  })

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

  it('should show the second screen after entering correctly personal information', async () => {
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
  
    expect(await screen.findByText(/Ingrese su correo electronico y contraseña\./i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId(/confirmPassword/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /regresar/i })).toBeInTheDocument()
  })

  describe('Test creation of user', () => {
    it('Given a user registering his user and the email is in use, show error', async () => {
      const user = userEvent.setup()
      mockedAxios.post.mockRejectedValue({
        code: 'ERR_BAD_REQUEST',
        config: null,
        message: 'Request failed with status code 401',
        name: 'AxiosError',
        request: null,
        response: {
          config: null,
          data: {
            data: null,
            error: {
              error: 'Unauthorized',
              message: 'Email or Password incorrect.',
              statusCode: 401
            },
            message: null,
            success: false,
            version: '1.2.0'
          }
        }
      })

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

      const emailInput = screen.getByLabelText(/correo electrónico/i)
      const passwordInput = screen.getByTestId('password')
      const confirmPasswordInput = screen.getByTestId('confirmPassword')
      const createAccountButton = screen.getByRole('button', { name: /crear cuenta/i })
      
      await user.type(emailInput, 'rafa@example.com')
      await user.type(passwordInput, 'UnaContrase;amuylargaparaminuevacuenta!1')
      await user.type(confirmPasswordInput, 'UnaContrase;amuylargaparaminuevacuenta!1')
      await user.click(createAccountButton)
      expect(await screen.findByText(ERROR_CREATE_USER_TITLE)).toBeInTheDocument()
      expect(screen.getByText('Intente con otro correo electrónico')).toBeInTheDocument()
      const goBackLogin = screen.getByRole('link', { name: /regresar al inicio/i })
      expect(goBackLogin).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /volver a intentar/i })).toBeInTheDocument()
    })

    it('should show the result screen after successfully creating a user', async () => {
      const user = userEvent.setup()
      mockedAxios.post.mockResolvedValue({
        error: null,
        message: null,
        success: true,
        version: "v1.2.0",
        data: {
          userCreated: {
            email: "rafa10@mail.com",
            sub: "6844b5aa39dceaf18bde61a2"
          }
        }
      })

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

      const emailInput = screen.getByLabelText(/correo electrónico/i)
      const passwordInput = screen.getByTestId('password')
      const confirmPasswordInput = screen.getByTestId('confirmPassword')
      const createAccountButton = screen.getByRole('button', { name: /crear cuenta/i })
      
      await user.type(emailInput, 'rafa@example.com')
      await user.type(passwordInput, 'UnaContrase;amuylargaparaminuevacuenta!1')
      await user.type(confirmPasswordInput, 'UnaContrase;amuylargaparaminuevacuenta!1')
      await user.click(createAccountButton)
      expect(await screen.findByText(SUCCESS_CREATE_USER_TITLE)).toBeInTheDocument()
      expect(screen.getByText(SUCCESS_CREATE_USER_MESSAGE)).toBeInTheDocument()
      const goBackLogin = screen.getByRole('link', { name: /regresar al inicio/i })
      expect(goBackLogin).toBeInTheDocument()
    })
  })
})