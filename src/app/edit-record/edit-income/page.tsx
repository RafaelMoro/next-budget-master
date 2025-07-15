import { EditIncome } from "@/features/Records/EditIncome";
import { getAccessToken } from "@/shared/lib/auth.lib";
import { fetchCategories } from "@/shared/lib/categoires.lib";
import { getAccountCookie } from "@/shared/lib/preferences.lib";

export default async function EditExpensePage() {
  const accessToken = await getAccessToken()
  const selectedAccountCookie = await getAccountCookie()
  const selectedAccount = selectedAccountCookie ?? null;
  const resCategories = await fetchCategories()

  return (
    <EditIncome resCategories={resCategories} selectedAccount={selectedAccount} accessToken={accessToken} />
  )
}