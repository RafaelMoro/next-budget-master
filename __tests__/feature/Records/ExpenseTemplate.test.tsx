import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { ExpenseTemplate } from "@/features/Records/ExpenseTemplate/ExpenseTemplate";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import {QueryProviderWrapper} from "@/app/QueryProviderWrapper";
import { mockCategories } from "../../mocks/categories.mock";
import { Category } from "@/shared/types/categories.types";
import { editRecord, recordMock } from "../../mocks/records.mock";
import { CREATE_EXPENSE_INCOME_ERROR } from "@/shared/constants/records.constants";
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants";
import { SelectedAccountLS } from "@/shared/types/global.types";
import { Budget } from "@/shared/types/budgets.types";
import { mockBudgets } from "../../mocks/budgets.mock";
import { BankMovement } from "@/shared/types/records.types";
import { mockMatchMedia, QueryMatchMedia } from "../../utils/record.utils";

const ExpenseTemplateWrapper = ({
  push,
  categories = [],
  budgetsFetched = [],
  selectedAccLS = null,
  editRecord = null
}: {
  push: () => void;
  categories?: Category[];
  budgetsFetched?: Budget[]
  selectedAccLS?: SelectedAccountLS | null
  editRecord?: BankMovement | null
}) => {
  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push }}>
        <ExpenseTemplate
          categories={categories}
          budgetsFetched={budgetsFetched}
          selectedAccount="123"
          accessToken="abc"
          detailedErrorCategories={null}
          detailedErrorBudgets={null}
          selectedAccLS={selectedAccLS}
          editRecord={editRecord}
        />
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  )
}

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ session: 'session-mock' })),
    set: jest.fn(),
  })),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ExpenseTemplate", () => {
  mockMatchMedia({
    [QueryMatchMedia.isMobileTablet]: false,
    [QueryMatchMedia.isDesktop]: false,
  });

  it("should show expense template", () => {
    const push = jest.fn();
    render(<ExpenseTemplateWrapper push={push} budgetsFetched={mockBudgets} />);

    expect(screen.getByLabelText(/Cantidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pequeña descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción \(opcional\)/i)).toBeInTheDocument();
    
    const categoryButton = screen.getByTestId('category-dropdown');
    const subcategoryButton = screen.getByTestId('subcategory-dropdown');

    expect(categoryButton).toBeInTheDocument();
    expect(subcategoryButton).toBeInTheDocument();
    expect(screen.getByTestId('select-budget-dropdown-button')).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear gasto/i })).toBeInTheDocument();
  });

  it('Given a user having a credit account, show toggle button to check if the debt is paid', () => {
    const push = jest.fn();
    const selectedAccLS: SelectedAccountLS = {
      accountId: '123',
      accountType: "Crédito"
    };
    render(<ExpenseTemplateWrapper push={push} selectedAccLS={selectedAccLS} />);

    expect(screen.getByTestId('toggle-switch-is-paid')).toBeInTheDocument();
  })

  describe('Form Validations', () => {
    it('Given a user clicking on create expense, show validation error for short description to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} />);

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una pequeña descripción/i)).toBeInTheDocument()
    })

    it('Given a user typing one letter and then clicking create expense, show validation error for description to be more than 3 characters', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} />);

      const description = screen.getByLabelText(/Descripción \(opcional\)/i);
      await user.type(description, 'a');

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una descripción de más de 3 caracteres/i)).toBeInTheDocument();
    })

    it('Given a user typing more than 300 characters and then clicking create expense, show validation error for description to be less than 300 characters', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} />);

      const description = screen.getByLabelText(/Descripción \(opcional\)/i);
      await user.type(description, 'a'.repeat(301));

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una descripción con menos de 300 caracteres/i)).toBeInTheDocument();
    })

    it('Given a user filling the short description and then clicking create expense, show validation error for category to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, seleccione una categoría/i)).toBeInTheDocument();
    })

    it('Given a user filling the short description and selecting a category, then clicking create expense, it should show the validation error for subcategory to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);

      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, seleccione una subcategoría/i)).toBeInTheDocument();
    })

    it('Given a user gets a category error, when the user selects a category, the error should disappear', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
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
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} />);

      const shortDescriptionInput = screen.getByLabelText(/Pequeña descripción/i);
      await user.type(shortDescriptionInput, 'Test expense');

      const categoryButton = screen.getByTestId('category-dropdown');
      await user.click(categoryButton);
      const categoryToSelect = screen.getByText(mockCategories[0].categoryName);
      await user.click(categoryToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      const subcategoryError = screen.getByText(/Por favor, seleccione una subcategoría/i);
      expect(subcategoryError).toBeInTheDocument();

      const subcategoryButton = screen.getByTestId('subcategory-dropdown');
      await user.click(subcategoryButton);
      const subcategoryToSelect = screen.getByText(mockCategories[0].subCategories[0]);
      await user.click(subcategoryToSelect);

      expect(screen.queryByText(/Por favor, seleccione una subcategoría/i)).not.toBeInTheDocument();
    })

    it('Given a user filling all fields except amount, then clicking create expense, it should show the validation error for amount to be required', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} />);

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

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(/Por favor, ingrese una cantidad mayor a 0/i)).toBeInTheDocument();
    })

    it('Given a user gets an amount error, when the user types an amount, the error should disappear', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} />);

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

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      const amountError = screen.getByText(/Por favor, ingrese una cantidad mayor a 0/i);
      expect(amountError).toBeInTheDocument();

      const amountInput = screen.getByLabelText(/Cantidad/i);
      await user.type(amountInput, '123');

      expect(screen.queryByText(/Por favor, ingrese una cantidad mayor a 0/i)).not.toBeInTheDocument();
    })
  })

  it('Given a user with a edit expense, the fields should have the record values', () => {
    mockMatchMedia({
      [QueryMatchMedia.isMobileTablet]: false,
      [QueryMatchMedia.isDesktop]: true,
    });
    const push = jest.fn();
    render(<ExpenseTemplateWrapper push={push} categories={mockCategories} budgetsFetched={mockBudgets} editRecord={editRecord} />);

    expect(screen.getByLabelText(/Pequeña descripción/i)).toHaveValue(editRecord.shortName);
    expect(screen.getByLabelText(/Cantidad/i)).toHaveValue(editRecord.amountFormatted);
    expect(screen.getByLabelText(/Descripción \(opcional\)/i)).toHaveValue(editRecord.description);
    expect(screen.getByTestId('category-dropdown')).toHaveTextContent('Comida y Bebida');
    expect(screen.getByTestId('subcategory-dropdown')).toHaveTextContent(editRecord.subCategory);

    // linkedBudget
    expect(screen.getByTestId('select-budget-dropdown-button')).toHaveTextContent('Monthly Budget');
    // tag
    expect(screen.getByText('something')).toBeInTheDocument();
    // indebted people
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar gasto/i })).toBeInTheDocument();
  })

  describe('Form submission', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    it('Given a user filling correctly the form, it should see the tick in the button', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      mockedAxios.post.mockResolvedValue({
        error: null,
        message: ['Expense created', 'Account updated'],
        success: true,
        version: "v1.2.0",
        data: {
          expense: recordMock
        },
      })
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} budgetsFetched={mockBudgets} />);

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

      const amountInput = screen.getByLabelText(/Cantidad/i);
      await user.type(amountInput, '123');

      const budgetDropdown = screen.getByTestId('select-budget-dropdown-button')
      await user.click(budgetDropdown);
      const budgetToSelect = screen.getByText(mockBudgets[0].name);
      await user.click(budgetToSelect);

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
      await waitFor(() => {
        expect(push).toHaveBeenCalledWith(DASHBOARD_ROUTE)
      }, { timeout: 2000 })
    })

    it('Given a user filling correctly the form, then something went wrong, it should show notification', async () => {
      const user = userEvent.setup();
      const push = jest.fn();
      mockedAxios.post.mockRejectedValue({
        code: 'ERR_BAD_REQUEST',
        config: null,
        message: 'Request failed with status code 401',
        name: 'AxiosError',
        request: null,
        response: {
          config: null,
          data: {
            data: null,
            error: {
              error: 'Bad Request',
              message: 'Something went wrong.',
              statusCode: 403
            },
            message: null,
            success: false,
            version: '1.2.0'
          }
        }
      })
      render(<ExpenseTemplateWrapper push={push} categories={mockCategories} />);

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

      const amountInput = screen.getByLabelText(/Cantidad/i);
      await user.type(amountInput, '123');

      const createExpenseButton = screen.getByRole('button', { name: /Crear gasto/i });
      await user.click(createExpenseButton);

      expect(screen.getByText(CREATE_EXPENSE_INCOME_ERROR)).toBeInTheDocument();
    })
  })
});
