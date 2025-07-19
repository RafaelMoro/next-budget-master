import { ExpensePaid } from "@/shared/types/records.types";
import { Badge, ListGroup, ListGroupItem } from "flowbite-react";
import { getBadgeColor, getBadgeText } from "./expensePaid.utils";

interface ExpensePaidListProps {
  expenses: ExpensePaid[];
}

export const ExpensePaidList = ({ expenses }: ExpensePaidListProps) => {
  return (
    <ListGroup>
      { expenses.map((expense) => (
        <ListGroupItem className="max-w-80 sm:max-w-screen" key={expense._id}>
          <div className="w-full grid grid-layout-expenses-paid-list grid-rows-3 gap-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 col-span-2">{expense.fullDate}</p>
            <h5 className="text-start text-base">{expense.shortName}</h5>
            <p className="col-start-3 col-end-4 row-span-2 place-self-center text-red-500">- {expense.amountFormatted}</p>
            <Badge className="max-w-max col-start-2 col-end-3 row-start-3 row-end-4 text-xs" color={getBadgeColor(expense?.isPaid)}>
              {getBadgeText(expense?.isPaid)}
            </Badge>
          </div>
        </ListGroupItem>
      )) }
    </ListGroup>
  )
}