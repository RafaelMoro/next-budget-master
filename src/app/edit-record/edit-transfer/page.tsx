import { EditTransfer } from "@/features/Records/Transfer/EditTransfer";
import { getAccessToken } from "@/shared/lib/auth.lib";
import { fetchCategories } from "@/shared/lib/categoires.lib";
import { getAccountCookie } from "@/shared/lib/preferences.lib";

export default async function EditTransferPage() {
  const [accessToken, selectedAccountCookie, resCategories] = await Promise.all([
    getAccessToken(),
    getAccountCookie(),
    fetchCategories()
  ])
  const selectedAccount = selectedAccountCookie ?? null;

  return (
    <EditTransfer resCategories={resCategories} selectedAccount={selectedAccount} accessToken={accessToken} />
  )
}