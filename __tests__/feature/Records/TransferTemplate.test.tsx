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
})