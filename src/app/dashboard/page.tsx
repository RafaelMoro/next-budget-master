import { getAccessToken } from '@/shared/lib/auth.lib';
import { fetchAccounts, fetchRecordsCurrentMonth } from '@/shared/lib/dashboard.lib';
import { LoginRequiredModal } from '@/shared/ui/organisms/LoginRequiredModal';
import { DashboardView } from '@/features/Dashboard/DashboardView';
import { getAccountCookie } from '@/shared/lib/preferences.lib';

export default async function DashboardPage () {
  const accessToken = await getAccessToken()
  const { accounts, detailedError } = await fetchAccounts()
  const selectedAccountCookie = await getAccountCookie()
  const selectedAccount = selectedAccountCookie ?? accounts[0]?._id ?? null;
  const { detailedError: errorFetchRecords, records } = await fetchRecordsCurrentMonth({ accountId: selectedAccount });

  return (
    <>
      <LoginRequiredModal show={!accessToken} />
      <DashboardView accounts={accounts} records={records} detailedError={detailedError} />
    </>
  )
}

