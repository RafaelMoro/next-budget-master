import { cookies } from 'next/headers'
export default async function DashboardPage () {
  const cookie = cookies().get('accessToken')
  console.log('cookie', cookie)
  const hardcodedCookie = 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTZjZTJhYmZlMzgwNjg0NjY1ZTkyYTMiLCJpYXQiOjE3NDkyNjE3NTgsImV4cCI6MTc0OTY5Mzc1OH0.zd73FvC_HxLA6XpPZ8vRG96x4p1gTixB3OM3MJQy73U; Max-Age=432000; Path=/; Expires=Thu, 12 Jun 2025 02:02:38 GMT; HttpOnly'

  const data = await fetch('http://localhost:6006/account-actions', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': hardcodedCookie
    }
  })
  console.log('data', data)
  return (
    <h1 className="text-black dark:text-white text-4xl text-center font-bold">Dashboard</h1>
  )
}