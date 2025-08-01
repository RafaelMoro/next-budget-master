import { render, screen } from "@testing-library/react"

import { LastMonthAccordion } from "@/features/Records/Accordions/LastMonthAccordion"
import { DashboardStoreProvider } from "@/zustand/provider/dashboard-store-provider"
import { mockAccounts } from "../../mocks/accounts.mock"
import { QueryProviderWrapper } from "@/app/QueryProviderWrapper"
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock"
import { mockMatchMedia, QueryMatchMedia } from "../../utils-test/record.utils"

const LastMonthAccordionWrapper = ({ push }: { push: () => void }) => {
  return (
    <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={{ push }}>
          <LastMonthAccordion />
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    </DashboardStoreProvider>
  )
}

describe('LastMonthAccordion', () => {
  mockMatchMedia({
    [QueryMatchMedia.isMobileTablet]: false,
    [QueryMatchMedia.isDesktop]: false,
  });

  it('Show last month accordion', () => {
    const push = jest.fn();
    render(<LastMonthAccordionWrapper push={push} />)

    expect(screen.getByText('Último mes')).toBeInTheDocument()
  })
})