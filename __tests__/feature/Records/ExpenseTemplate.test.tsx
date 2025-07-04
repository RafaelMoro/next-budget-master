import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import { ExpenseTemplate } from "@/features/Records/ExpenseTemplate";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import QueryProviderWrapper from "@/app/QueryProviderWrapper";

const ExpenseTemplateWrapper = ({
  push
}: {
  push: () => void
}) => {
  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push }}>
        <ExpenseTemplate
          categories={[]}
          selectedAccount="123"
          accessToken="abc"
          detailedError={null}
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

describe("ExpenseTemplate", () => {
  it("should show expense template", () => {
    const push = jest.fn();
    render(<ExpenseTemplateWrapper push={push} />);

    expect(screen.getByLabelText(/Cantidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pequeña descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción \(opcional\)/i)).toBeInTheDocument();
    
    const categoryButton = screen.getByTestId('category-dropdown');
    const subcategoryButton = screen.getByTestId('subcategory-dropdown');

    expect(categoryButton).toBeInTheDocument();
    expect(subcategoryButton).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear gasto/i })).toBeInTheDocument();
  });

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
  })
});
