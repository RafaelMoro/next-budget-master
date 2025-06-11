import { GetAccountResponse } from '@/shared/types/Accounts.types'

import { getAccessToken } from '@/shared/lib/auth';
import { ShowAccounts } from '@/features/Accounts/ShowAccounts';
import { AreaChartTypeExample } from '@/components/AreaChartTest';
import { Header } from '@/shared/ui/organisms/Header';
import { DashboardAside } from '@/shared/ui/organisms/DashboardAside';

export default async function DashboardPage () {
  const accessToken = await getAccessToken()
  const res = await fetch('http://localhost:6006/account-actions', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const data: GetAccountResponse = await res.json()
  const { data: { accounts } } = data;

  return (
    <>
      <div className="w-full min-h-screen max-w-screen-2xl flex justify-center gap-5">
        <DashboardAside>
          <Header isHeaderAside />
        </DashboardAside>
        <main className='min-w-xl mt-3 flex flex-col gap-4"'>
          <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Welcome User</h1>
          <ShowAccounts accounts={accounts} />
        </main>
      </div>
      <AreaChartTypeExample />
    </>
  )
}

