import { GetAccountResponse } from '@/shared/types/Accounts.types'
import { Card } from "flowbite-react";
import { getAccessToken } from '@/shared/lib/auth';

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
      { accounts.map((account) => (
        <Card key={account._id} href="#" className="max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {account.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {account.amount}
          </p>
        </Card>
      )) }
    </div>
  )
}

