import type { Metadata } from "next";

import { TransactionManager } from "@/features/Records/TransactionManager";
import { getAccessToken } from "@/shared/lib/auth.lib";
import { fetchCategories } from "@/shared/lib/categoires.lib";
import { getAccountCookie } from "@/shared/lib/preferences.lib";
import { LoginRequiredModal } from "@/shared/ui/organisms/LoginRequiredModal";
import { CREATE_RECORD_META_DESCRIPTION, CREATE_RECORD_META_TITLE } from "@/shared/constants/metadata.constants";

export const metadata: Metadata = {
  title: CREATE_RECORD_META_TITLE,
  description: CREATE_RECORD_META_DESCRIPTION,
};

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