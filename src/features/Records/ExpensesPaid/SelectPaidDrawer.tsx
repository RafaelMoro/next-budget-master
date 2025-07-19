"use client"
import { FormEvent } from "react";
import { SelectMonthDropdown } from "@/shared/ui/atoms/SelectMonthDropdown"
import { SelectYearDropdown } from "@/shared/ui/atoms/SelectYearDropdown"
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react"
import { ExpensesPaidTable } from "./ExpensesPaidTable"
import { CompleteMonthsType } from "@/shared/types/global.types";
import { DrawerDirection, ExpensePaid } from "@/shared/types/records.types";
import { ExpensesPaidList } from "./SelectExpensesPaidList";

interface SelectExpensesPaidDrawerProps {
  isOpen: boolean;
  drawerDirection: DrawerDirection;
  allMonths: CompleteMonthsType[]
  selectedMonth: CompleteMonthsType | null
  selectedYear: string | null
  expenses: ExpensePaid[]
  selectedExpenses: ExpensePaid[]
  isMobile: boolean
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
          <form className="flex justify-center gap-3" onSubmit={handleSubmit}>
            <SelectMonthDropdown allMonths={allMonths} selectedMonth={selectedMonth} changeSelectedMonth={changeSelectedMonth} />
            <SelectYearDropdown selectedYear={selectedYear} changeSelectedYear={changeSelectedYear} />
            <Button type="submit" className="max-w-max" outline>Buscar</Button>
          </form>
          {
            expenses.length === 0 && (
              <div className="w-full">
                <p className="text-lg text-center py-3">No hay gastos que mostrar</p>
              </div>
            )
          }
          { (isMobile && expenses.length > 0) && (
            <ExpensesPaidList
              expenses={expenses}
              selectedExpenses={selectedExpenses}
              handleSelectExpense={handleSelectExpense}
              handleUnselectExpense={handleUnselectExpense}
            />
          )}
          { (!isMobile && expenses.length > 0) && (
            <ExpensesPaidTable
              expenses={expenses}
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