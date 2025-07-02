"use client"
import { useState } from "react"
import { Category, CategoryShown } from "../types/categories.types"

interface UseCategoriesFormProps {
  categories: Category[]
}

export const useCategoriesForm = ({ categories }: UseCategoriesFormProps) => {
  const categoriesShown: CategoryShown[] = categories.map((cat) => ({
    name: cat.categoryName,
    categoryId: cat._id
  }))
  const [categorySelected, setCategorySelected] = useState<CategoryShown>({
    name: '',
    categoryId: ''
  })
  const [subcategory, setSubcategory] = useState<string | null>(null)
  const subcategories = categories.find(cat => cat._id === categorySelected.categoryId)?.subCategories ?? []

  const updateCategory = (newCat: CategoryShown) => setCategorySelected(newCat)
  const updateSubcategory = (newSubcat: string) => setSubcategory(newSubcat)

  return {
    categoriesShown,
    categorySelected,
    updateCategory,
    subcategory,
    subcategories,
    updateSubcategory
  }
}