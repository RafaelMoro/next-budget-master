import { QueryProviderWrapper } from "@/app/QueryProviderWrapper";
import { TransferTemplate } from "@/features/Records/TransferTemplate";
import { Category } from "@/shared/types/categories.types";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import { render } from "@testing-library/react";
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
  })
})