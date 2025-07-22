import { render, screen } from "@testing-library/react";

import { QueryProviderWrapper } from "@/app/QueryProviderWrapper";
import { TransferTemplate } from "@/features/Records/TransferTemplate";
import { Category } from "@/shared/types/categories.types";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import { mockMatchMedia, QueryMatchMedia } from "../../utils-test/record.utils";

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
})