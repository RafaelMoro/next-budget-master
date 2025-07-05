import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ManageTagsModal } from '@/features/Records/ManageTagsModal';
import { useManageTags } from '@/shared/hooks/useManageTags';

const ManageTagsModalWrapper = () => {
  const { openTagModal, tags, updateTags, openModal, closeModal } = useManageTags();

  return (
    <ManageTagsModal
      openModal={openTagModal}
      openModalFn={openModal}
      closeModalFn={closeModal}
      tags={tags.current}
      updateTags={updateTags}
    />
  );
};

describe('ManageTagsModal', () => {
  it('should open the modal when clicking the button', async () => {
    const user = userEvent.setup();
    render(<ManageTagsModalWrapper />);

    const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
    await user.click(openModalButton);

    const modalTitle = await screen.findByRole('heading', { name: /Agregar etiqueta/i });
    expect(modalTitle).toBeInTheDocument();
    const closeModalButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeModalButton)
  });

  it('should remove a tag when clicking the close icon', async () => {
    const user = userEvent.setup();
    render(<ManageTagsModalWrapper />);

    const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
    await user.click(openModalButton);

    await screen.findByRole('heading', { name: /Agregar etiqueta/i });
    const tagInput = screen.getByTestId('tag');
    await user.type(tagInput, 'example');

    const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
    await user.click(addTagButton);

    await screen.findByText(/example/i);
    const removeButton = await screen.findByRole('button', { name: /Remove example/i });
    await user.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText(/example/i)).not.toBeInTheDocument();
    });
    const closeModalButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeModalButton)
  });

  it('should add a tag when submitting the form', async () => {
    const user = userEvent.setup();
    render(<ManageTagsModalWrapper />);

    const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
    await user.click(openModalButton);

    await screen.findByRole('heading', { name: /Agregar etiqueta/i });

    const tagInput = screen.getByTestId('tag');
    await user.type(tagInput, 'new tag');

    const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
    await user.click(addTagButton);

    await waitFor(() => {
      const newTagBadge = screen.getByText(/new tag/i);
      expect(newTagBadge).toBeInTheDocument();
    })

    const closeModalButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeModalButton)
  });

  describe('Form validations', () => {
    it('should show required error if input is empty', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta/i)).toBeInTheDocument();

      const closeModalButton = await screen.findByRole('button', { name: /close/i });
      await user.click(closeModalButton)
    });

    it('should show min length error if tag is too short', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      await screen.findByRole('heading', { name: /Agregar etiqueta/i });

      const tagInput = screen.getByTestId('tag');
      await user.clear(tagInput);
      await user.type(tagInput, 'a');

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      await waitFor(async () => {
        expect(await screen.findByText(/Por favor, ingrese una etiqueta de más de 2 caracteres/i)).toBeInTheDocument();
      })

      const closeModalButton = await screen.findByRole('button', { name: /close/i });
      await user.click(closeModalButton)
    });

    it('should show max length error if tag is too long', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      await screen.findByRole('heading', { name: /Agregar etiqueta/i });

      const tagInput = screen.getByTestId('tag');
      await user.clear(tagInput);
      await user.type(tagInput, 'this is a very long input that exceeds the maximum length of fifty characters');

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta con menos de 50 caracteres/i)).toBeInTheDocument();

      const closeModalButton = await screen.findByRole('button', { name: /close/i });
      await user.click(closeModalButton)
    });

    it('should clear the error when user types', async () => {
      const user = userEvent.setup();
      render(<ManageTagsModalWrapper />);

      const openModalButton = screen.getByRole('button', { name: /Crear etiquetas/i });
      await user.click(openModalButton);

      const addTagButton = await screen.findByRole('button', { name: /Agregar etiqueta/i });
      await user.click(addTagButton);

      expect(await screen.findByText(/Por favor, ingrese una etiqueta/i)).toBeInTheDocument();

      const tagInput = await screen.findByTestId('tag');
      await user.type(tagInput, 'a');

      expect(screen.queryByText(/Por favor, ingrese una etiqueta/i)).not.toBeInTheDocument();

      const closeModalButton = await screen.findByRole('button', { name: /close/i });
      await user.click(closeModalButton)
    });
  });
});
