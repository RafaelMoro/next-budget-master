"use client"
import { FormEvent } from "react";
import { SelectMonthDropdown } from "@/shared/ui/atoms/SelectMonthDropdown"
import { SelectYearDropdown } from "@/shared/ui/atoms/SelectYearDropdown"
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react"
import { ExpensesPaidTable } from "./ExpensesPaidTable"
import { CompleteMonthsType } from "@/shared/types/global.types";
import { BankMovement, DrawerDirection } from "@/shared/types/records.types";

interface SelectExpensesPaidDrawerProps {
  isOpen: boolean;
  drawerDirection: DrawerDirection;
  allMonths: CompleteMonthsType[]
  selectedMonth: CompleteMonthsType | null
  selectedYear: string | null
  expenses: BankMovement[]
  selectedExpenses: BankMovement[]
  toggleOpen: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  changeSelectedMonth: (newMonth: CompleteMonthsType) => void
  changeSelectedYear: (newYear: string) => void
  handleSelectExpense: (expense: BankMovement) => void
  handleUnselectExpense: (expense: BankMovement) => void
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
          <ExpensesPaidTable
            expenses={expenses}
            handleSelectExpense={handleSelectExpense}
            handleUnselectExpense={handleUnselectExpense}
            selectedExpenses={selectedExpenses}
          />
          <Button onClick={handleClick}>Terminar</Button>
        </div>
      </DrawerItems>
    </Drawer>
  )
}