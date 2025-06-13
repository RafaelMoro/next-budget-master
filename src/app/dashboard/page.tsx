import { getAccessToken } from '@/shared/lib/auth.lib';
import { fetchAccounts } from '@/shared/lib/dashboard.lib';
import { LoginRequiredModal } from '@/shared/ui/organisms/LoginRequiredModal';
import { DashboardView } from '@/features/Dashboard/DashboardView';
import { getThemePreference } from '@/shared/lib/preferences.lib';
import { ThemeMode } from '@/shared/constants/Global.constants';

export default async function DashboardPage () {
  const accessToken = await getAccessToken()
  const themeFetched = await getThemePreference()
  const theme: ThemeMode = (themeFetched as ThemeMode) ?? 'dark'
  const { accounts } = await fetchAccounts({ accessToken })

  return (
    <>
      <LoginRequiredModal show={!accessToken} />
      <DashboardView theme={theme} accounts={accounts} />
    </>
  )
}

