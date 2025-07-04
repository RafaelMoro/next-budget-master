import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { TransactionCategorizerDropdown } from "@/features/Categories/TransactionCategorizerDropdown";
import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm";
import { mockCategories } from "../mocks/categories.mock";
import { Category } from "@/shared/types/categories.types";

const TransactionCategorizerWrapper = ({ categories }: { categories: Category[] }) => {
  const {
      categoriesShown,
      categorySelected,
      updateCategory,
      subcategory,
      subcategories,
      updateSubcategory,
      categoryError,
      subcategoryError
  } = useCategoriesForm({ categories });

  return (
    <TransactionCategorizerDropdown
        categoriesShown={categoriesShown}
        categorySelected={categorySelected}
        updateCategory={updateCategory}
        categoryError={categoryError}
        subcategories={subcategories}
        subcategory={subcategory}
        updateSubcategory={updateSubcategory}
        subcategoryError={subcategoryError}
    />
  )
}

describe('TransactionCategorizer', () => {
  it('should render the component with the categories', () => {
    render(<TransactionCategorizerWrapper categories={mockCategories} />);

    const categoryButton = screen.getByTestId('category-dropdown');
    const subcategoryButton = screen.getByTestId('subcategory-dropdown');

    expect(categoryButton).toBeInTheDocument();
    expect(subcategoryButton).toBeInTheDocument();
    expect(subcategoryButton).toBeDisabled();
  });

  it('given a user selecting a category, it should enable the subcategory dropdown', async () => {
    const user = userEvent.setup();
    render(<TransactionCategorizerWrapper categories={mockCategories} />);

    const categoryButton = screen.getByTestId('category-dropdown');
    await user.click(categoryButton);

    const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
    await user.click(categoryToSelect);

    const subcategoryButton = screen.getByTestId('subcategory-dropdown');
    expect(subcategoryButton).not.toBeDisabled();
  });

  it('given a user selecting a subcategory, then changing category, it should reset the subcategory', async () => {
    const user = userEvent.setup();
    render(<TransactionCategorizerWrapper categories={mockCategories} />);

    // Select first category
    const categoryButton = screen.getByTestId('category-dropdown');
    await user.click(categoryButton);
    const firstCategory = screen.getByText(mockCategories[0].categoryName);
    await user.click(firstCategory);

    // Select a subcategory
    const subcategoryButton = screen.getByTestId('subcategory-dropdown');
    await user.click(subcategoryButton);
    const subcategoryToSelect = screen.getByText(mockCategories[0].subCategories[0]);
    await user.click(subcategoryToSelect);

    expect(screen.getByText(`Subcategoria: ${mockCategories[0].subCategories[0]}`)).toBeInTheDocument();

    // Select second category
    await user.click(categoryButton);
    const secondCategory = screen.getByText(mockCategories[1].categoryName);
    await user.click(secondCategory);

    expect(screen.getByText("Subcategoria:")).toBeInTheDocument();
  });
});
