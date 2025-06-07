"use client"
import { AccountBank } from "@/shared/types/Accounts.types";
import { Card } from "flowbite-react";

interface AccountsProps {
  accounts: AccountBank<string, number>[]
}
export const ShowAccounts = ({ accounts }: AccountsProps) => {
  return accounts.map((account) => (
    <Card key={account._id} href="#" className="max-w-sm">
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {account.title}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      {account.amount}
    </p>
  </Card>
  ))
}