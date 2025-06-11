import { LoginPage } from '@/features/Login/Login/LoginPage';
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants';
import { getAccessToken } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const accessToken = await getAccessToken()
  if (accessToken) {
    redirect(DASHBOARD_ROUTE)
  }

  return (
    <LoginPage />
  );
}
