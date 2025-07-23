import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import { QueryProviderWrapper } from "@/app/QueryProviderWrapper";
import { TransferTemplate } from "@/features/Records/TransferTemplate";
import { Category } from "@/shared/types/categories.types";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import { mockMatchMedia, QueryMatchMedia } from "../../utils-test/record.utils";
import { mockCategories } from "../../mocks/categories.mock";

const TransferTemplateWrapper = ({
  push,
  categories = [],
}: {
  push: () => void;
  categories?: Category[];
}) => {
  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push }}>
        <TransferTemplate
          categories={categories}
          selectedAccount="123"
          accessToken="abc"
          detailedErrorCategories={null}
          subscreen="transfer"
        />
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  )
}

describe('TransferTemplate', () => {
  mockMatchMedia({
    [QueryMatchMedia.isMobileTablet]: false,
    [QueryMatchMedia.isDesktop]: false,
  });

  it('Show transfer temmplate', () => {
    const push = jest.fn();
    render(<TransferTemplateWrapper push={push} />)

    expect(screen.getByTestId('select-origin-dropdown-button')).toBeInTheDocument();
    expect(screen.getByTestId('select-destination-dropdown-button')).toBeInTheDocument();
    expect(screen.getByLabelText(/Cantidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pequeña descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción \(opcional\)/i)).toBeInTheDocument();

    const categoryButton = screen.getByTestId('category-dropdown');
    const subcategoryButton = screen.getByTestId('subcategory-dropdown');

    expect(categoryButton).toBeInTheDocument();
    expect(subcategoryButton).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear transferencia/i })).toBeInTheDocument();
  })

  describe('More details section', () => {
    it('Given a user being on desktop, should see the more details section', () => {
      mockMatchMedia({
        [QueryMatchMedia.isMobileTablet]: false,
        [QueryMatchMedia.isDesktop]: true,
      });
  
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} />)
  
      expect(screen.getByText(/Más detalles/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Etiquetas/i })).toBeInTheDocument();
    })
  
    it('Given a user being on desktop, should see the more details section', () => {
      mockMatchMedia({
        [QueryMatchMedia.isMobileTablet]: true,
        [QueryMatchMedia.isDesktop]: false,
      });
  
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} />)
  
      expect(screen.getByRole('button', { name: /Más detalles/i  })).toBeInTheDocument();
    })
  })

  describe('Form Validations', () => {
    it('Given a user clicking on create a transfer, show validation error for short description to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} />);

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una pequeña descripción/i)).toBeInTheDocument()
    })

    it('Given a user typing one letter and then clicking create a transfer, show validation error for description to be more than 3 characters', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} />);

      const description = screen.getByLabelText(/Descripción \(opcional\)/i);
      await user.type(description, 'a');

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una descripción de más de 3 caracteres/i)).toBeInTheDocument();
    })

    it('Given a user typing more than 300 characters and then clicking create a transfer, show validation error for description to be less than 300 characters', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} />);

      const description = screen.getByLabelText(/Descripción \(opcional\)/i);
      await user.type(description, 'a'.repeat(301));

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una descripción con menos de 300 caracteres/i)).toBeInTheDocument();
    })

    it('Given a user filling the short description and then clicking create a transfer, show validation error for category to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, seleccione una categoría/i)).toBeInTheDocument();
    })

    it('Given a user filling the short description and selecting a category, then clicking create a transfer, it should show the validation error for subcategory to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);

      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, seleccione una subcategoría/i)).toBeInTheDocument();
    })

    it('Given a user gets a category error, when the user selects a category, the error should disappear', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      const categoryError = screen.getByText(/Por favor, seleccione una categoría/i);
      expect(categoryError).toBeInTheDocument();

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);
      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      expect(screen.queryByText(/Por favor, seleccione una categoría/i)).not.toBeInTheDocument();
    })

    it('Given a user gets a subcategory error, when the user selects a subcategory, the error should disappear', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);
      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      const subcategoryError = screen.getByText(/Por favor, seleccione una subcategoría/i);
      expect(subcategoryError).toBeInTheDocument();

      const subcategoryButton = screen.getByTestId('subcategory-dropdown');
      await user.click(subcategoryButton);
      const subcategoryToSelect = screen.getByText(mockCategories[0].subCategories[0]);
      await user.click(subcategoryToSelect);

      expect(screen.queryByText(/Por favor, seleccione una subcategoría/i)).not.toBeInTheDocument();
    })

    it('Given a user filling all fields except amount, then clicking create a transfer, it should show the validation error for amount to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);
      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      const subcategoryButton = screen.getByTestId('subcategory-dropdown');
      await user.click(subcategoryButton);
      const subcategoryToSelect = screen.getByText(mockCategories[0].subCategories[0]);
      await user.click(subcategoryToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una cantidad mayor a 0/i)).toBeInTheDocument();
    })

    it('Given a user gets an amount error, when the user types an amount, the error should disappear', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<TransferTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);
      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      const subcategoryButton = screen.getByTestId('subcategory-dropdown');
      await user.click(subcategoryButton);
      const subcategoryToSelect = screen.getByText(mockCategories[0].subCategories[0]);
      await user.click(subcategoryToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear transferencia/i });
      await user.click(createExpenseButton);

      const amountError = screen.getByText(/Por favor, ingrese una cantidad mayor a 0/i);
      expect(amountError).toBeInTheDocument();

      const amountInput = screen.getByLabelText(/Cantidad/i);
      await user.type(amountInput, '123');

      expect(screen.queryByText(/Por favor, ingrese una cantidad mayor a 0/i)).not.toBeInTheDocument();
    })
  })
})