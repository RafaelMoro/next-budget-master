import { GetAccountResponse } from '@/shared/types/Accounts.types'

import { getAccessToken } from '@/shared/lib/auth';
import { ShowAccounts } from '@/features/Accounts/ShowAccounts';

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
    <div className='grid grid-col-3 gap-4 justify-items-center'>
      <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Accounts</h1>
      <ShowAccounts accounts={accounts} />
    </div>
  )
}

