"use client"
import { FormEvent } from "react";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react"
import { ExpensesPaidTable } from "./ExpensesPaidTable"
import { CompleteMonthsType } from "@/shared/types/global.types";
import { DrawerDirection, ExpensePaid } from "@/shared/types/records.types";
import { SelectExpensesPaidList } from "./SelectExpensesPaidList";
import { DateRangeSearchPanel } from "@/shared/ui/molecules/DateRangeSearchPanel";

interface SelectExpensesPaidDrawerProps {
  isOpen: boolean;
  drawerDirection: DrawerDirection;
  allMonths: CompleteMonthsType[]
  selectedMonth: CompleteMonthsType | null
  selectedYear: string | null
  expenses: ExpensePaid[]
  selectedExpenses: ExpensePaid[]
  isMobile: boolean
  totalSelectedExpenses: string
  toggleOpen: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  changeSelectedMonth: (newMonth: CompleteMonthsType) => void
  changeSelectedYear: (newYear: string) => void
  handleSelectExpense: (expense: ExpensePaid) => void
  handleUnselectExpense: (expense: ExpensePaid) => void
  handleClick: () => void
}

export const SelectPaidDrawer = ({
  isOpen,
  drawerDirection,
  allMonths,
  selectedMonth,
  selectedYear,
  expenses,
  selectedExpenses,
  isMobile,
  totalSelectedExpenses,
  toggleOpen,
  handleSubmit,
  changeSelectedMonth,
  changeSelectedYear,
  handleSelectExpense,
  handleUnselectExpense,
  handleClick
}: SelectExpensesPaidDrawerProps) => {
  return (
    <Drawer className="w-max" open={isOpen} onClose={toggleOpen} position={drawerDirection}>
      <DrawerHeader title="Agregar gastos" />
      <DrawerItems>
        <div className="flex flex-col gap-5">
          <DateRangeSearchPanel
            allMonths={allMonths}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            handleSubmit={handleSubmit}
            changeSelectedMonth={changeSelectedMonth}
            changeSelectedYear={changeSelectedYear}
          />
          {
            expenses.length === 0 && (
              <div className="w-full">
                <p className="text-lg text-center py-3">No hay gastos que mostrar</p>
              </div>
            )
          }
          { (isMobile && expenses.length > 0) && (
            <SelectExpensesPaidList
              expenses={expenses}
              selectedExpenses={selectedExpenses}
              handleSelectExpense={handleSelectExpense}
              handleUnselectExpense={handleUnselectExpense}
            />
          )}
          { (!isMobile && expenses.length > 0) && (
            <ExpensesPaidTable
              expenses={expenses}
              totalSelectedExpenses={totalSelectedExpenses}
              handleSelectExpense={handleSelectExpense}
              handleUnselectExpense={handleUnselectExpense}
              selectedExpenses={selectedExpenses}
            />
          )}
          <Button onClick={handleClick}>Terminar</Button>
        </div>
      </DrawerItems>
    </Drawer>
  )
}