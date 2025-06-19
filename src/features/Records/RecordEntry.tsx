import { RiHome9Fill } from "@remixicon/react";
import { Badge } from "flowbite-react";
import { clsx } from 'clsx';

import { BankMovement, TypeOfRecord } from "@/shared/types/records.types"

interface AccountEntryProps {
  record: BankMovement;
}

export const RecordEntry = ({ record }: AccountEntryProps) => {
  const priceClass = clsx(
    'col-start-2 col-end-3 row-start-3 row-end-4',
    { "text-red-600": record.typeOfRecord === 'expense' },
    { "text-green-500": record.typeOfRecord === 'income' },
    { "text-blue-600": record.typeOfRecord === 'transfer' }
  )

  const showPriceDict: Record<TypeOfRecord, string> = {
    expense: `- ${record.amountFormatted}`,
    income: `+ ${record.amountFormatted}`,
    transfer: `${record.amountFormatted}`
  }
  const showBadgeDict: Record<TypeOfRecord, string> = {
    expense: 'Unpaid',
    income: 'Paid',
    transfer: 'Transfer'
  }
  const badgeColorDict: Record<TypeOfRecord, string> = {
    expense: 'failure',
    income: 'success',
    transfer: 'info'
  }

  return (
    <article className="p-2 rounded-lg grid grid-rows-3 grid-view-records gap-x-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
      <span className="col-span-3 text-center text-gray-600 dark:text-gray-400 text-sm">{record.fullDate} {record.formattedTime}</span>
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 flex items-center">
        <RiHome9Fill />
      </div>
      <h5 className="col-start-2 col-end-3 row-start-2 row-end-3 text-xl font-semibold capitalize">{record.shortName}</h5>
      <p className={priceClass}>{showPriceDict[record.typeOfRecord]}</p>
      <div className="col-start-3 col-end-4 row-span-2 max-w-min flex items-center">
        <Badge color={badgeColorDict[record.typeOfRecord]}>{showBadgeDict[record.typeOfRecord]}</Badge>
      </div>
    </article>
  )
}