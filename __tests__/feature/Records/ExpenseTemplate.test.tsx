import { render, screen } from "@testing-library/react";
import { ExpenseTemplate } from "@/features/Records/ExpenseTemplate";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import QueryProviderWrapper from "@/app/QueryProviderWrapper";

const ExpenseTemplateWrapper = () => {
  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push: jest.fn() }}>
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
    render(<ExpenseTemplateWrapper />);

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
});
