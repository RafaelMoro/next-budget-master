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

  it("Show modal to delete record", () => {
    render(<DeleteRecordModalTestWrapper />);
    expect(screen.getByRole("heading", { name: /Eliminar/i })).toBeInTheDocument();
    expect(screen.getByText(/¿Estás seguro de que deseas eliminar esta transacción/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Eliminar$/i })).toBeInTheDocument();
  });

  it("Close modal when the button Cancelar is clicked", async () => {
    const toggleModal = jest.fn();
    render(<DeleteRecordModalTestWrapper toggleModal={toggleModal} />);
    await userEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(toggleModal).toHaveBeenCalled();
  });

  it("Show success icon after deletion of record", async () => {
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
    await waitFor(() => {
      expect(refresh).toHaveBeenCalled()
    });
  });

  it("Show error when deletion fails", async () => {
    mockedAxios.delete.mockRejectedValue({
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
    const toggleModal = jest.fn();
    const handleCloseDrawer = jest.fn();
    render(<DeleteRecordModalTestWrapper toggleModal={toggleModal} handleCloseDrawer={handleCloseDrawer} />);
    await userEvent.click(screen.getByRole("button", { name: /^Eliminar$/i }));
  });
});
