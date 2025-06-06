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
 
    const heading = screen.getByRole('heading', { name: /bienvenido de vuelta/i })
 
    expect(heading).toBeInTheDocument()
  })
})