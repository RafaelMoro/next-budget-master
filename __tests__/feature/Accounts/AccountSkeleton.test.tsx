import { AccountSkeleton } from "@/features/Accounts/AccountSkeleton"
import { render, screen } from "@testing-library/react"

describe('AccountSkeleton', () => {
  it('Show account skeleton', () => {
    render(<AccountSkeleton />)

    expect(screen.getByTestId('account-skeleton')).toBeInTheDocument()
  })
})