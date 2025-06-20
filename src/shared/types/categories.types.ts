export type Category = {
  _id: string;
  __v: number;
  categoryName: string;
  subCategories: string[];
  icon: string;
}

export type CategoriesIcons = 'foodAndDrink' |
  'house' |
  'utilities' |
  'subcriptions' |
  'transportation' |
  'debtAndLoans' |
  'healthCare' |
  'kids' |
  'shopping' |
  'entertainment' |
  'savings' |
  'income' |
  'newCategory'