import type { Metadata } from "next";
import { redirect } from 'next/navigation';

import { LoginPage } from '@/features/Login/Login/LoginPage';
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants';
import { getAccessToken } from '@/shared/lib/auth.lib';
import { LOGIN_META_DESCRIPTION, LOGIN_META_TITLE } from "@/shared/constants/metadata.constants";

export const metadata: Metadata = {
  title: LOGIN_META_TITLE,
  description: LOGIN_META_DESCRIPTION,
};

export default async function Home() {
  const accessToken = await getAccessToken()
  if (accessToken) {
    redirect(DASHBOARD_ROUTE)
  }

  return (
    <LoginPage />
  );
}
