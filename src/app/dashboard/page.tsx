import { getAccessToken } from '@/shared/lib/auth.lib';
import { fetchAccounts } from '@/shared/lib/dashboard.lib';
import { LoginRequiredModal } from '@/shared/ui/organisms/LoginRequiredModal';
import { DashboardView } from '@/features/Dashboard/DashboardView';

export default async function DashboardPage () {
  const accessToken = await getAccessToken()
  const { accounts } = await fetchAccounts({ accessToken })

  return (
    <>
      <LoginRequiredModal show={!accessToken} />
      <DashboardView accounts={accounts} />
    </>
  )
}

