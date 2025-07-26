import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DeleteRecordModal } from "@/features/Records/DeleteRecordModal";
import { QueryProviderWrapper } from "@/app/QueryProviderWrapper";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import { useState } from "react";
import { recordMock } from "../../mocks/records.mock";

// Mock next/headers for cookies if needed (not used in this component, but for future-proofing)
// jest.mock("next/headers", () => ({
//   cookies: jest.fn(() => ({ get: jest.fn() })),
// }));

const push = jest.fn();
const refresh = jest.fn();

const DeleteRecordModalWrapper = () => {
  const [openDeleteRecordModal, setOpenDeleteRecordModal] = useState(true);
  const toggleDeleteRecordModal = () => setOpenDeleteRecordModal((prev) => !prev);
  const defaultProps = {
    handleCloseDrawer: jest.fn(),
  };

  return(
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push, refresh }}>
        <DeleteRecordModal
          open={openDeleteRecordModal}
          toggleModal={toggleDeleteRecordModal}
          record={recordMock}
          handleCloseDrawer={defaultProps.handleCloseDrawer}
        />
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  );
};

describe("DeleteRecordModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with record name and actions", () => {
    render(<DeleteRecordModalWrapper />);
    // Modal title (use a more specific query)
    expect(screen.getByRole("heading", { name: /Eliminar/i })).toBeInTheDocument();
    // Modal body
    expect(screen.getByText(/¿Estás seguro de que deseas eliminar esta transacción/i)).toBeInTheDocument();
    // Cancel and Delete buttons
    expect(screen.getByRole("button", { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Eliminar$/i })).toBeInTheDocument();
  });

  it("calls toggleModal when Cancelar is clicked", async () => {
    const toggleModal = jest.fn();
    render(<DeleteRecordModalWrapper />)

    await userEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(toggleModal).toHaveBeenCalled();
  });

  it("calls deleteExpenseCb and shows spinner when Eliminar is clicked", async () => {
    render(<DeleteRecordModalWrapper />)
  
    await userEvent.click(screen.getByRole("button", { name: /Eliminar/i }));
    expect(await screen.findByLabelText(/loading delete record budget master/i)).toBeInTheDocument();
  });

  it("shows check icon on success", async () => {
    render(<DeleteRecordModalWrapper />)
  
    await userEvent.click(screen.getByRole("button", { name: /Eliminar/i }));
    expect(await screen.findByTestId("check-icon")).toBeInTheDocument();
    await waitFor(() => expect(refresh).toHaveBeenCalled());
  });

  it("shows error toast and closes modal on error", async () => {
    const toggleModal = jest.fn();
    const handleCloseDrawer = jest.fn();
    render(<DeleteRecordModalWrapper />)
  
    await userEvent.click(screen.getByRole("button", { name: /Eliminar/i }));;
    await waitFor(() => expect(toggleModal).toHaveBeenCalled());
    await waitFor(() => expect(handleCloseDrawer).toHaveBeenCalled());
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    render(<DeleteRecordModalWrapper />)
  
    expect(screen.queryByText(/Eliminar Test Record/i)).not.toBeInTheDocument();
  });
});
