import { render, screen } from "@testing-library/react"
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
  })
})