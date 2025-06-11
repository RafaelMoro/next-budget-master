import { LoginPage } from '@/features/Login/Login/LoginPage';
import { getAccessToken } from '@/shared/lib/auth';

export default async function Home() {
  const accessToken = await getAccessToken()

  return (
    <LoginPage accessToken={accessToken} />
  );
}
