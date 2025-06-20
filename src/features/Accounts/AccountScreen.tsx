import { AccountBank } from "@/shared/types/accounts.types";
import { CreateAccButton } from "./CreateAccButton";
import { AccountsView } from "./AccountsView";
import { NoAccountsFoundView } from "./NoAccountsFoundView";

interface AccountScreenProps {
  accounts: AccountBank[];
}

/**
 * Shows the screen of accounts with title, instructions and button to create an account
 * @param accounts - Accounts fetched 
 * @returns a screen to handle accounts
 */
export const AccountScreen = ({ accounts }: AccountScreenProps) => {
  return (
    <main className="w-full pl-4 pt-4 min-w-xl mt-3 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Cuentas bancarias</h1>
      { accounts.length === 0 && (
        <NoAccountsFoundView />
      )}
      { accounts.length > 0  && (
        <>
          <div className="w-full flex justify-end">
            <CreateAccButton />
          </div>
          <p className="text-center text-xl mb-5">Haz click en cualquiera de tus cuentas para ver más en detalle la informacion</p>
          <AccountsView accounts={accounts} />
        </>
      )}
    </main>
  )
}