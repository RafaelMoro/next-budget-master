export default async function DashboardPage () {
  const data = await fetch('http://localhost:6006/account-actions')
  console.log('data', data)
  return (
    <h1 className="text-black dark:text-white text-4xl text-center font-bold">Dashboard</h1>
  )
}