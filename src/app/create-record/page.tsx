import { TransactionManager } from "@/features/Records/TransactionManager";
import { getAccessToken } from "@/shared/lib/auth.lib";
import { fetchCategories } from "@/shared/lib/categoires.lib";
import { getAccountCookie } from "@/shared/lib/preferences.lib";
import { LoginRequiredModal } from "@/shared/ui/organisms/LoginRequiredModal";

export default async function CreateRecordPage() {
  const accessToken = await getAccessToken()
  const selectedAccountCookie = await getAccountCookie()
  const selectedAccount = selectedAccountCookie ?? null;
  const { categories, detailedError } = await fetchCategories()

  return (
    <>
      <LoginRequiredModal show={!accessToken} />
      <TransactionManager
        categories={categories}
        selectedAccount={selectedAccount}
        accessToken={accessToken}
        detailedError={detailedError}
      />
    </>
  )
}