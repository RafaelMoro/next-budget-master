import { Category } from "@/shared/types/categories.types";
import { BankMovement } from "@/shared/types/records.types";
import { mockBudgets } from "./budgets.mock";
import { mockCategories } from "./categories.mock";

const categoryMock: Category = {
  _id: "65f3be727c46232bf19e7d00",
  categoryName: "Comida y Bebida",
  subCategories: [
    "Comida rápida",
    "Restaurantes",
    "Bebidas",
  ],
  icon: "foodAndDrink",
  __v: 0
}

export const recordMock: BankMovement ={
  _id: "6855ed98e3d57ba1214bc5bf",
  userId: "6352d54809f579c80080353f",
  shortName: "Arby's burger y papas",
  typeOfRecord: "expense",
  description: "",
  amount: 380,
  amountFormatted: "$380.00",
  date: new Date("2025-06-20T17:23:42.000Z"),
  fullDate: "Vie, 20 Jun, 2025",
  formattedTime: "17:23pm",
  category: categoryMock,
  subCategory: "Comida rápida",
  tag: [],
  indebtedPeople: [],
  account: "6579221448b3dbd136ce2988",
  budgets: [],
  isPaid: false,
  linkedBudgets: [],
}
export const editExpense: BankMovement = {
  ...recordMock,
  shortName: 'Edited Expense',
  description: 'a edited expense description',
  amount: 500,
  amountFormatted: '$500.00',
  tag: ['something'],
  indebtedPeople: [
    { name: 'John', amount: 12, amountPaid: 0, isPaid: false }
  ],
  linkedBudgets: [mockBudgets[0]],
  category: mockCategories[0],
  subCategory: mockCategories[0].subCategories[0],
};

export const editIncome: BankMovement = {
  ...recordMock,
  shortName: 'Edited Income',
  description: 'a edited income description',
  amount: 500,
  amountFormatted: '$500.00',
  tag: ['something'],
  category: mockCategories[0],
  subCategory: mockCategories[0].subCategories[0],
}

export const paidRecordMock: BankMovement = {
  ...recordMock,
  isPaid: true,
  shortName: "Paid Record Example",
  amount: 500,
  amountFormatted: "$500.00",
};