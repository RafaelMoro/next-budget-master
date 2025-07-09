import type { Metadata } from "next";
import { Suspense } from "react"

import { ResetPasswordView } from "@/features/Login/ResetPassword/ResetPasswordView"
import { RESET_PASSWORD_META_DESCRIPTION, RESET_PASSWORD_META_TITLE } from "@/shared/constants/metadata.constants";

export const metadata: Metadata = {
  title: RESET_PASSWORD_META_TITLE,
  description: RESET_PASSWORD_META_DESCRIPTION,
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
 
  return (
    <Suspense fallback={<p>Fallback reset password</p>}>
      <ResetPasswordView slug={slug} />
    </Suspense>
  )
}