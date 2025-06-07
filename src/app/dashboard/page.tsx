import { jwtVerify } from 'jose';
import { GetAccountResponse } from '@/shared/types/Accounts.types'
import { cookies } from 'next/headers'
import { Card } from "flowbite-react";
import { COOKIE_SESSION_KEY } from '@/shared/constants/Global.constants';

export default async function DashboardPage () {
  const secretKey = process.env.SESSION_SECRET_KEY!
  const session = cookies().get(COOKIE_SESSION_KEY)?.value ?? ''
  const encodedKey = new TextEncoder().encode(secretKey)
  const jwtDecoded = await jwtVerify(session, encodedKey)
  const accessToken = jwtDecoded?.payload?.accessToken as string
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

