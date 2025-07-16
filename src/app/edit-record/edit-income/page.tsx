import { EditIncome } from "@/features/Records/EditIncome";
import { getAccessToken } from "@/shared/lib/auth.lib";
import { fetchCategories } from "@/shared/lib/categoires.lib";
import { getAccountCookie } from "@/shared/lib/preferences.lib";

export default async function EditExpensePage() {
  const [accessToken, selectedAccountCookie, resCategories] = await Promise.all([
    getAccessToken(),
    getAccountCookie(),
    fetchCategories()
  ])
  const selectedAccount = selectedAccountCookie ?? null;

  return (
    <EditIncome resCategories={resCategories} selectedAccount={selectedAccount} accessToken={accessToken} />
  )
}