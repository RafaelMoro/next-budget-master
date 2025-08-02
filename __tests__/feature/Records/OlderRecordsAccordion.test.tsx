import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { DashboardStoreProvider } from "@/zustand/provider/dashboard-store-provider"
import { mockAccounts } from "../../mocks/accounts.mock"
import { QueryProviderWrapper } from "@/app/QueryProviderWrapper"
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock"
import { OlderRecordsAccordion } from "@/features/Records/Accordions/OlderRecordsAccordion"
import { mockMatchMedia, QueryMatchMedia } from "../../utils-test/record.utils";

const LastMonthAccordionWrapper = ({ push }: { push: () => void }) => {
  return (
    <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={{ push }}>
          <OlderRecordsAccordion />
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    </DashboardStoreProvider>
  )
}

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OlderRecordsAccordion', () => {
  mockMatchMedia({
    [QueryMatchMedia.isMobileTablet]: false,
    [QueryMatchMedia.isDesktop]: false,
  });

  it('Show older records month accordion', () => {
    const push = jest.fn();
    render(<LastMonthAccordionWrapper push={push} />)

    expect(screen.getByText('Transacciones anteriores')).toBeInTheDocument()
  })
})