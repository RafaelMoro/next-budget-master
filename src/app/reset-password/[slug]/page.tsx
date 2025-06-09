import { ResetPasswordView } from "@/features/Login/ResetPassword/ResetPassword"
import { Suspense } from "react"

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