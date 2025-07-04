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
  })
});
