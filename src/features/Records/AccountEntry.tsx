import { RiHome9Fill } from "@remixicon/react";
import { Badge } from "flowbite-react";
import { clsx } from 'clsx';

import { BankMovement } from "@/shared/types/records.types"

interface AccountEntryProps {
  record: BankMovement;
}

export const AccountEntry = ({ record }: AccountEntryProps) => {
  const priceClass = clsx(
    'col-start-2 col-end-3 row-start-2 row-end-3 text-lg',
    { "text-red-600": record.typeOfRecord === 'expense' },
    { "text-green-500": record.typeOfRecord === 'income' },
    { "text-blue-600": record.typeOfRecord === 'transfer' }
  )

  const showPriceDict: Record<string, string> = {
    expense: `- ${record.amountFormatted}`,
    income: `+ ${record.amountFormatted}`,
    transfer: `${record.amountFormatted}`
  }

  return (
    <article className="grid grid-rows-2 grid-cols-3">
      <div className="row-span-2 col-start-1 col-end-2 max-w-7">
        <RiHome9Fill />
      </div>
      <h5 className="col-start-2 col-end-3 row-start-1 row-end-2 text-xl font-bold">{record.shortName}</h5>
      <p className={priceClass}>{showPriceDict[record.typeOfRecord]}</p>
      <div className="max-w-min col-start-3 col-end-4 row-span-2 flex items-center">
        <Badge color="red">Unpaid</Badge>
      </div>
    </article>
  )
}