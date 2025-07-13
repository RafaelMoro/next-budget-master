import { EditExpense } from "@/features/Records/EditExpense";
import { getAccessToken } from "@/shared/lib/auth.lib";
import { fetchAllBudgets } from "@/shared/lib/budgets.lib";
import { fetchCategories } from "@/shared/lib/categoires.lib";
import { getAccountCookie } from "@/shared/lib/preferences.lib";

export default async function EditExpensePage() {
  const accessToken = await getAccessToken()
  const selectedAccountCookie = await getAccountCookie()
  const selectedAccount = selectedAccountCookie ?? null;
  const resCategories = await fetchCategories()
  const resBudgets = await fetchAllBudgets()

  return (
    <EditExpense
      resCategories={resCategories}
      resBudgets={resBudgets}
      selectedAccount={selectedAccount}
      accessToken={accessToken}
    />
  )
}