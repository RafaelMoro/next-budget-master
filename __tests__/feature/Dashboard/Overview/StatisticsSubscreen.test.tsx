import { render, screen } from '@testing-library/react';
import { StatisticsSubscreen } from '@/features/Dashboard/Overview/subscreens/StatisticsSubscreen';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { mockAccounts } from '../../../mocks/accounts.mock';

describe('StatisticsSubscreen', () => {
  it('renders empty state when there are no records', () => {
    render(
      <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
        <StatisticsSubscreen />
      </DashboardStoreProvider>
    );
    expect(screen.getByText(/Sin transacciones, sin gráficas/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrar movimiento/i })).toBeInTheDocument();
  });
});
