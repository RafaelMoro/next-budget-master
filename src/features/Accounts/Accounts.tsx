import Image from "next/image"
import { AccountProvider } from "@/shared/types/accounts.types";

interface AccountProps {
  name: string;
  balance: string;
  accountType: string;
  accountProvider: AccountProvider;
}

export const Account = ({ name, balance, accountType, accountProvider = 'mastercard' }: AccountProps) => {
  const accProviderImg: Record<AccountProvider, string> = {
    mastercard: '/img/mastercard-logo.svg',
    visa: '/img/visa-logo.svg',
    americanExpress: '/img/amex-logo.svg'
  }

  return (
    <button className="p-2 rounded-3xl card-gradient-bg flex flex-col justify-between max-w-64 min-h-40 text-start cursor-pointer">
      <span className="text-lg text-gray-200">{name}</span>
      <div>
        <h5 className="text-2xl text-gray-200 font-semibold">{balance}</h5>
        <div className="flex justify-between mx-2 mb-1">
          <p className="text-sm text-gray-300 dark:text-gray-400">{accountType} **0762</p>
          <Image src={accProviderImg[accountProvider]} alt="Budget Master Logo" width={40} height={40} />
        </div>
      </div>
    </button>
  )
}