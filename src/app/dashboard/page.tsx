import { getAccessToken } from '@/shared/lib/auth.lib';
import { ShowAccounts } from '@/features/Accounts/ShowAccounts';
import { Header } from '@/shared/ui/organisms/Header';
import { DashboardAside } from '@/shared/ui/organisms/DashboardAside';
import { fetchAccounts } from '@/shared/lib/dashboard.lib';
import { LoginRequiredModal } from '@/shared/ui/organisms/LoginRequiredModal';

export default async function DashboardPage () {
  const accessToken = await getAccessToken()
  const { accounts } = await fetchAccounts({ accessToken })

  return (
    <>
      <LoginRequiredModal show={!accessToken} />
      <div className="w-full min-h-screen max-w-screen-2xl flex justify-center gap-5">
        <DashboardAside>
          <Header isHeaderAside />
        </DashboardAside>
        <main className='min-w-xl mt-3 flex flex-col gap-4"'>
          <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Welcome User</h1>
          <ShowAccounts accounts={accounts} />
        </main>
      </div>
    </>
  )
}

