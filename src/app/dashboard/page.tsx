import type { Metadata } from "next";

import { getAccessToken } from '@/shared/lib/auth.lib';
import { fetchAccounts, fetchRecordsCurrentMonth } from '@/shared/lib/dashboard.lib';
import { LoginRequiredModal } from '@/shared/ui/organisms/LoginRequiredModal';
import { Dashboard } from '@/features/Dashboard/Dashboard';
import { getAccountCookie } from '@/shared/lib/preferences.lib';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { DASHBOARD_META_DESCRIPTION, DASHBOARD_META_TITLE } from "@/shared/constants/metadata.constants";

export const metadata: Metadata = {
  title: DASHBOARD_META_TITLE,
  description: DASHBOARD_META_DESCRIPTION,
};

export default async function DashboardPage () {
  const accessToken = await getAccessToken()
  const { accounts, detailedError } = await fetchAccounts()
  const selectedAccountCookie = await getAccountCookie()
  const selectedAccount = selectedAccountCookie ?? accounts[0]?._id ?? null;
  const { records } = await fetchRecordsCurrentMonth({ accountId: selectedAccount });

  return (
    <DashboardStoreProvider records={records} accounts={accounts} selectedAccountId={selectedAccount}>
      <LoginRequiredModal accessToken={accessToken} />
      <Dashboard detailedError={detailedError} accountsFetched={accounts} />
    </DashboardStoreProvider>
  )
}

