import { useEffect, useState } from "react";
import { getAccountProvider, getTerminationFormatted } from "@/shared/lib/accounts.lib";
import { AccountBank, AccountsDisplay, AccountTypes } from "@/shared/types/accounts.types";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";
import { Account } from "@/features/Accounts/Accounts";
import { BankMovement } from "@/shared/types/records.types";
import { MonthAccordionRecords } from "@/features/Records/CurrentMonthAccordionRecords";

interface AccountOverviewSubscreenProps {
  accounts: AccountBank[];
  selectedAccountId: string | null;
  records: BankMovement[];
}

/**
 * This subscreen shows the overview of the account with it's information and records
 * @param param0 
 * @returns 
 */
export const AccountOverviewSubscreen = ({ accounts, selectedAccountId, records }: AccountOverviewSubscreenProps) => {
  const [account, setSelectedAccount] = useState<AccountsDisplay | null>(null)

  useEffect(() => {
    if (selectedAccountId) {
      const selectedAccount = accounts.find((acc) => acc._id === selectedAccountId);
      if (!selectedAccount) {
        setSelectedAccount(null);
        return;
      }
      const formattedAccount: AccountsDisplay = {
          accountId: selectedAccount._id,
          name: selectedAccount.title,
          amount: formatNumberToCurrency(selectedAccount.amount),
          // We're sure the account type is not other string than type AccountTypes
          type: (selectedAccount.accountType as AccountTypes),
          alias: selectedAccount.alias,
          terminationFourDigits: selectedAccount.terminationFourDigits,
          terminationFourDigitsTransformed: getTerminationFormatted(selectedAccount.terminationFourDigits),
          accountProvider: getAccountProvider(selectedAccount.accountProvider) // Default to mastercard if not provided
        }
        setSelectedAccount(formattedAccount)
      }
    }, [accounts, selectedAccountId])

  return (
    <section className="w-full mt-9 flex flex-col gap-5 items-center justify-center">
      { account && (
        <Account
          account={account}
          // TODO: Correct this
          openModal={() => {}}
        />
      )}
      <MonthAccordionRecords records={records} title="Este mes" />
    </section>
  )
}