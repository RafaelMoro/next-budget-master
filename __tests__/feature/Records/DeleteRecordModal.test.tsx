import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from 'axios';

import { DeleteRecordModal } from "@/features/Records/DeleteRecordModal";
import { QueryProviderWrapper } from "@/app/QueryProviderWrapper";
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock";
import { useState } from "react";
import { recordMock } from "../../mocks/records.mock";

const push = jest.fn();
const refresh = jest.fn();


type WrapperProps = {
  open?: boolean;
  toggleModal?: () => void;
  handleCloseDrawer?: () => void;
};

function DeleteRecordModalTestWrapper(props: WrapperProps = {}) {
  const [openDeleteRecordModal, setOpenDeleteRecordModal] = useState(true);
  const toggleDeleteRecordModal = props.toggleModal || (() => setOpenDeleteRecordModal((prev) => !prev));
  const handleCloseDrawer = props.handleCloseDrawer || jest.fn();
  return (
    <QueryProviderWrapper>
      <AppRouterContextProviderMock router={{ push, refresh }}>
        <DeleteRecordModal
          open={typeof props.open === 'boolean' ? props.open : openDeleteRecordModal}
          toggleModal={toggleDeleteRecordModal}
          record={recordMock}
          handleCloseDrawer={handleCloseDrawer}
        />
      </AppRouterContextProviderMock>
    </QueryProviderWrapper>
  );
}

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("DeleteRecordModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with record name and actions", () => {
    render(<DeleteRecordModalTestWrapper />);
    expect(screen.getByRole("heading", { name: /Eliminar/i })).toBeInTheDocument();
    expect(screen.getByText(/¿Estás seguro de que deseas eliminar esta transacción/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Eliminar$/i })).toBeInTheDocument();
  });

  it("calls toggleModal when Cancelar is clicked", async () => {
    const toggleModal = jest.fn();
    render(<DeleteRecordModalTestWrapper toggleModal={toggleModal} />);
    await userEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(toggleModal).toHaveBeenCalled();
  });

  it("calls deleteExpenseCb and shows spinner when Eliminar is clicked", async () => {
    render(<DeleteRecordModalTestWrapper />);
    await userEvent.click(screen.getByRole("button", { name: /^Eliminar$/i }));
    // Spinner may not appear instantly, so wait for it
    expect(await screen.findByLabelText(/loading delete record budget master/i)).toBeInTheDocument();
  });

  it("shows check icon on success", async () => {
    mockedAxios.delete.mockResolvedValue({
      error: null,
      message: ['Expense created', 'Account updated'],
      success: true,
      version: "v1.2.0",
      data: {
        expense: recordMock
      },
    })
    render(<DeleteRecordModalTestWrapper />);
    await userEvent.click(screen.getByRole("button", { name: /^Eliminar$/i }));
    expect(await screen.findByTestId("check-icon")).toBeInTheDocument();
    await waitFor(() => expect(refresh).toHaveBeenCalled());
  });

  it("shows error toast and closes modal on error", async () => {
    const toggleModal = jest.fn();
    const handleCloseDrawer = jest.fn();
    render(<DeleteRecordModalTestWrapper toggleModal={toggleModal} handleCloseDrawer={handleCloseDrawer} />);
    await userEvent.click(screen.getByRole("button", { name: /^Eliminar$/i }));
    await waitFor(() => expect(toggleModal).toHaveBeenCalled());
    await waitFor(() => expect(handleCloseDrawer).toHaveBeenCalled());
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    render(<DeleteRecordModalTestWrapper open={false} />);
    expect(screen.queryByText(/Eliminar/i)).not.toBeInTheDocument();
  });
});
