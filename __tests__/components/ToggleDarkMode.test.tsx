import { ToggleDarkMode } from '@/shared/ui/atoms/ToggleDarkMode'
import { render, screen } from '@testing-library/react'

describe('ToggleDarkMode', () => {
  it('Should show toggle dark mode button', () => {
    render(<ToggleDarkMode />)

    expect(screen.getByTestId('toggle-theme-mode-button')).toBeInTheDocument()
  })
})