export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
 
  return (
    <div>Reset password {slug}</div>
  )
}