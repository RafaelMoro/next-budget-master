import { getAccessToken } from '@/shared/lib/auth.lib';
import { fetchAccounts, fetchRecordsCurrentMonth } from '@/shared/lib/dashboard.lib';
import { LoginRequiredModal } from '@/shared/ui/organisms/LoginRequiredModal';
import { Dashboard } from '@/features/Dashboard/Dashboard';
import { getAccountCookie } from '@/shared/lib/preferences.lib';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';

export default async function Page () {
  const accessToken = await getAccessToken()
  const { accounts, detailedError } = await fetchAccounts()
  const selectedAccountCookie = await getAccountCookie()
  const selectedAccount = selectedAccountCookie ?? accounts[0]?._id ?? null;
  const { message, records } = await fetchRecordsCurrentMonth({ accountId: selectedAccount });

  return (
    <DashboardStoreProvider records={records} accounts={accounts} selectedAccountId={selectedAccount}>
      <LoginRequiredModal show={!accessToken} />
      <Dashboard detailedError={detailedError} message={message} accountsFetched={accounts} />
    </DashboardStoreProvider>
  )
}

