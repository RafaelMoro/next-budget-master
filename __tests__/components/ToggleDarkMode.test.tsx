import { ToggleDarkMode } from '@/shared/ui/atoms/ToggleDarkMode'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ToggleDarkMode', () => {
  it('Should show toggle dark mode button', () => {
    render(<ToggleDarkMode />)

    expect(screen.getByTestId('toggle-theme-mode-button')).toBeInTheDocument()
  })

  it('Should change to light mode when clicked', async() => {
    const user = userEvent.setup()
    render(<ToggleDarkMode />)

    const button = screen.getByTestId('toggle-theme-mode-button')
    await user.click(button)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})